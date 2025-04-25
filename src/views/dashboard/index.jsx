import './index.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { account } from '/src/lib/appwrite.js';
import {storage, databases, ID} from '/src/lib/appwrite.js';
import mixpanel from '/src/lib/mixpanel.js';
import toast from 'react-hot-toast';
import { FaCloudUploadAlt, FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// with audio
const MAX_RECORDING_TIME = 20 * 60 * 1000; // 20 minutes in milliseconds
const COUNTDOWN_TIME = 5; // 5 seconds countdown

const Dashboard = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [includeMic, setIncludeMic] = useState(true);
  const [micDevices, setMicDevices] = useState([]);
  const [selectedMicId, setSelectedMicId] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [stopTimeout, setStopTimeout] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isPreparing, setIsPreparing] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState(null);
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);

        // Mixpanel user identification
        mixpanel.identify(userData.$id);
        mixpanel.people.set({
          $name: userData.name,
          $email: userData.email,
        });
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  // Countdown effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isPreparing) {
      // When countdown reaches 0, start the actual recording
      startRecording();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, isPreparing]);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current'); // Logs out the current session
      window.location.href = '/'; // Redirect to homepage or login
      toast.success('Logged out successfully!');
    } catch (err) {
      console.error('Failed to logout:', err);
      toast.error('Logout failed. Please try again.');
    }
  };

  const handleUploadRecording = async () => {
    // Don't proceed if no blob is available
    if (!recordingBlob) {
      toast.error('No recording available to upload');
      return;
    }
    
    const bucketId = import.meta.env.VITE_RECORDING_BUCKET_ID;
    const databaseId = import.meta.env.VITE_DATABASE_ID;
    const collectionId = import.meta.env.VITE_COLLECTION_ID;
    const user = await account.get();
    const file = new File([recordingBlob], `recording-${Date.now()}.webm`, { type: 'video/webm' });
  
    try {
      toast.loading('Uploading your recording...');
  
      const uploadedFile = await storage.createFile(bucketId, ID.unique(), file);
  
      await databases.createDocument(databaseId, collectionId, ID.unique(), {
        userId: user.$id,
        fileId: uploadedFile.$id,
        createdAt: new Date().toISOString(),
        title: `Recording - ${new Date().toLocaleString()}`,
      });
  
      toast.dismiss();
      toast.success('Recording uploaded successfully!');
      
      // Close the preview after successful upload
      setShowPreview(false);
      
      // Clean up
      cleanupRecording();
    } catch (error) {
      console.error('Upload error:', error);
      toast.dismiss();
      toast.error('Upload failed. Please try again.');
    }
  };
  
  const cleanupRecording = () => {
    // Release blob URL to prevent memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    // Reset recording states
    setRecordingBlob(null);
    setPreviewUrl(null);
    setRecordedChunks([]);
  };
  
  const handleDiscardRecording = () => {
    setShowDiscardConfirmation(true);
  };
  
  const confirmDiscard = () => {
    toast.success('Recording discarded');
    setShowDiscardConfirmation(false);
    setShowPreview(false);
    cleanupRecording();
  };
  
  const cancelDiscard = () => {
    setShowDiscardConfirmation(false);
  };
  
  useEffect(() => {
    const loadMicDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const mics = devices.filter(d => d.kind === 'audioinput');
      setMicDevices(mics);
      if (mics.length > 0) setSelectedMicId(mics[0].deviceId);
    };

    loadMicDevices();
  }, []);

  const handleStartClick = () => {
    if (!isRecording && !isPreparing) setShowOptions(prev => !prev);
  };

  const prepareRecording = async (type) => {
    try {
      // Get screen capture permission first
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1920 }, // Full HD resolution
          height: { ideal: 1080 }, 
          frameRate: { ideal: 30 } // Higher frame rate for smoother video
        },
        audio: false,
      });

      let finalStream = displayStream;

      if (includeMic && selectedMicId) {
        // Get microphone permission
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: selectedMicId },
        });

        // Combine streams
        const combined = new MediaStream([
          ...displayStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);
        finalStream = combined;
      }

      // Store the stream for later
      setMediaStream(finalStream);
      setShowOptions(false);

      // Start countdown
      setIsPreparing(true);
      setCountdown(COUNTDOWN_TIME);
      toast.success(`Recording will start in ${COUNTDOWN_TIME} seconds`);
    } catch (err) {
      console.error('Error preparing recording:', err);
      setIsPreparing(false);
      toast.error('Failed to prepare recording. Please check your permissions.');
    }
  };

  const startRecording = () => {
    if (!mediaStream) return;
    
    try {
      const recorder = new MediaRecorder(mediaStream);
      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        setRecordingBlob(blob); // Store blob for later upload
        setPreviewUrl(url);
        setShowPreview(true);

        setMediaStream(null);
        setMediaRecorder(null);
        setRecordedChunks([]);
        setIsRecording(false);
        setIsPreparing(false);

        // No automatic upload - user must decide to save or discard
        toast.success('Recording ready for preview');
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecordedChunks(chunks);
      setIsRecording(true);
      setIsPreparing(false);
      toast.success('Recording started');

      // Set the 20-minute timeout
      const timeout = setTimeout(() => {
        handleStopRecording();
        toast.error('Recording stopped due to timeout.');
      }, MAX_RECORDING_TIME);
      setStopTimeout(timeout);
    } catch (err) {
      console.error('Error starting recording:', err);
      setIsPreparing(false);
      toast.error('Failed to start recording.');
      
      // Clean up stream if recording failed
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        setMediaStream(null);
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaStream.getTracks().forEach((track) => track.stop());
      clearTimeout(stopTimeout);
      toast.success('Recording stopped');
    }
  };

  const cancelRecording = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setIsPreparing(false);
    setCountdown(0);
    toast.info('Recording canceled');
  };

  return (
    <>
      <header className="dashboard-header">
        <div className="dashboard__header_wrapper">
          <div className="logo">
            <Link to="/dashboard">
              <img src="/logo.svg" alt="logo" />
            </Link>
          </div>
          <div className="user-profile">
            <button
              className="user-avatar"
              onClick={() => setShowDropdown(prev => !prev)}
            >
              {user?.prefs?.picture ? (
                <img
                  src={user.prefs.picture}
                  alt="User avatar"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <span>{user?.name?.charAt(0) || 'U'}</span>
              )}
            </button>

            {showDropdown && (
              <div className="user-dropdown">
                <button onClick={handleLogout}>Sign out</button>
                <button><Link to="/library">Library</Link></button>
                <button>User Profile</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="dashboard-title">
        <div className="dashboard-title__left">
          <h1>Videos</h1>
          <button onClick={handleStartClick} disabled={isRecording || isPreparing}>
            <span>New Recording</span>
          </button>
        </div>
        <div className="empty-div"></div>
      </div>

      <div className="dashboard-main">
        <h1>
          Hi, {user?.name} <br />What would you like to record today?
        </h1>

        {isPreparing && countdown > 0 ? (
          <div className="countdown-container">
            <div className="countdown-circle">
              <span className="countdown-number">{countdown}</span>
            </div>
            <p>Recording starts in {countdown} seconds</p>
            <button onClick={cancelRecording} className="cancel-button">Cancel</button>
          </div>
        ) : (
          <button onClick={handleStartClick} disabled={isRecording || isPreparing} className='dashboard__start-recording'>
            <img src="/video.svg" alt="video icon" />
            <span>
              {isRecording 
                ? 'Recording...' 
                : isPreparing 
                  ? 'Preparing...' 
                  : 'Start recording'}
            </span>
          </button>
        )}

        {showOptions && (
          <div className="recording-options">
            <p>Select what you want to record:</p>

            <div className="recording-options__buttons">
              <button onClick={() => prepareRecording('screen')}>Entire Screen</button>
              <button onClick={() => prepareRecording('window')}>Window</button>
              <button onClick={() => prepareRecording('tab')}>Browser Tab</button>
            </div>

            <div className="mic-toggle">
              <label>
                <input
                  type="checkbox"
                  checked={includeMic}
                  onChange={() => {
                    setIncludeMic(prev => !prev);
                    toast(`${includeMic ? 'Microphone disabled' : 'Microphone enabled'}`);
                  }}
                />
                Include Microphone
              </label>

              {includeMic && (
                <select
                  value={selectedMicId}
                  onChange={(e) => setSelectedMicId(e.target.value)}
                >
                  {micDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Mic ${device.deviceId.slice(-4)}`}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        )}

        {isRecording && (
          <div className="stop-recording">
            <button onClick={handleStopRecording}>Stop Recording</button>
          </div>
        )}

        {showPreview && (
          <div className="preview-modal">
            <div className="preview-content">
              <h3>Recording Preview</h3>
              <video src={previewUrl} controls autoPlay style={{ width: '100%' }} />

              <div className="preview-actions">
                <button onClick={handleUploadRecording} className="save-button">
                  <FaCloudUploadAlt />
                </button>
                <a href={previewUrl} download={`recording-${Date.now()}.webm`}>
                  <button>
                    <FaDownload />
                  </button>
                </a>
                <button onClick={handleDiscardRecording} className="discard-button">
                  <MdDelete />
                </button>
                <button onClick={() => setShowPreview(false)}
                className='close_preview'>Close</button>
              </div>
            </div>
          </div>
        )}
        
        {showDiscardConfirmation && (
          <div className="discard-modal">
            <div className="discard-content">
              <h3>Discard Recording?</h3>
              <p>Are you sure you want to discard this recording? This action cannot be undone.</p>
              <div className="discard-actions">
                <button onClick={confirmDiscard} className="confirm-button">Yes, Discard</button>
                <button onClick={cancelDiscard} className="cancel-button">No, Keep It</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;