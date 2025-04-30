import './index.scss';
import { useState, useEffect, useRef } from 'react';
import { storage, databases, ID, account } from '/src/lib/appwrite.js';
import toast from 'react-hot-toast';
import { useRecording } from '../../hooks/useRecording';
import { MdOutlineCancel } from "react-icons/md";
import { FaStop } from "react-icons/fa";
import { FaPause, FaPlay } from "react-icons/fa6";
import { RiResetLeftFill } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCloudUploadAlt, FaDownload } from "react-icons/fa";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";

// Constants
const MAX_RECORDING_TIME = 20 * 60 * 1000; // 20 minutes in milliseconds
const COUNTDOWN_TIME = 5; // 5 seconds countdown

// Custom event for library updates
const notifyLibraryUpdated = () => {
  window.dispatchEvent(new Event('library-updated'));
};

const RecordingOverlay = () => {
  const { hideOverlay } = useRecording();
  
  // Recording state
  const [showOptions, setShowOptions] = useState(true);
  const [includeMic, setIncludeMic] = useState(true);
  const [micDevices, setMicDevices] = useState([]);
  const [selectedMicId, setSelectedMicId] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [stopTimeout, setStopTimeout] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [isPreparing, setIsPreparing] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState(null);
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [webcamStream, setWebcamStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);

  
  // Refs
  const timerRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const webcamRef = useRef(null);
  const chunksRef = useRef([]);

  // Load available microphone devices
  useEffect(() => {
    const loadMicDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const mics = devices.filter(d => d.kind === 'audioinput');
      setMicDevices(mics);
      if (mics.length > 0) setSelectedMicId(mics[0].deviceId);
    };

    loadMicDevices();
    
    // Initialize webcam
    startWebcam();
    
    // Cleanup on component unmount
    return () => {
      stopWebcam();
      stopTimer();
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
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

  // Format time for display (00:00)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
      
       
  // Toggle camera on/off
  const toggleCamera = () => {
    if (isCameraOn) {
      stopWebcam();
      setIsCameraOn(false);
      toast.info('Camera turned off');
    } else {
      startWebcam();
      setIsCameraOn(true);
      toast.info('Camera turned on');
    }
  };

  // Start the webcam feed
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      });
      setWebcamStream(stream);
      
      // Delay to ensure ref is available
      setTimeout(() => {
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      console.error('Error starting webcam:', err);
      toast.error('Failed to access webcam. Please check your permissions.');
    }
  };

  // Stop the webcam feed
  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
    }
  };

  // Start the timer for recording duration
  const startTimer = () => {
    // Don't reset timer if we're resuming from pause
    if (!isPaused) {
      setRecordingTime(0);
    }
    
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  // Stop the timer
  const stopTimer = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
  };

  // Reset the timer
  const resetTimer = () => {
    stopTimer();
    setRecordingTime(0);
  };

  const playBeep = () => {
    const audio = new Audio('/bleep.mp3');
    audio.play().catch((err) => {
      console.warn('Audio play failed:', err);
    });
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
      // Clear chunks ref before starting new recording
      chunksRef.current = [];
      
      const recorder = new MediaRecorder(mediaStream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        setRecordingBlob(blob); // Store blob for later upload
        setPreviewUrl(url);
        setShowPreview(true);

        // Reset recording state
        setMediaStream(null);
        setMediaRecorder(null);
        setIsRecording(false);
        setIsPreparing(false);
        setIsPaused(false);
        
        // Stop the timer
        stopTimer();

        toast.success('Recording ready for preview');
      };

      playBeep(); // Play beep sound  
      recorder.start(1000); // Collect data every second
      setMediaRecorder(recorder);
      setIsRecording(true);
      setIsPreparing(false);
      toast.success('Recording started');

      // Start the timer
      startTimer();

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

  const handlePauseRecording = () => {
    if (!mediaRecorder) return;
    
    if (!isPaused && mediaRecorder.state === 'recording') {
      mediaRecorder.pause();
      setIsPaused(true);
      stopTimer(); // Pause the timer
      toast.info('Recording paused');
    } else if (isPaused && mediaRecorder.state === 'paused') {
      mediaRecorder.resume();
      setIsPaused(false);
      startTimer(); // Resume the timer
      toast.info('Recording resumed');
    }
  };

  const handleStopRecording = () => {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') return;
    
    // Only stop if we're recording or paused
    if (mediaRecorder && (mediaRecorder.state === 'recording' || mediaRecorder.state === 'paused')) {
      mediaRecorder.stop();
      
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      
      if (stopTimeout) {
        clearTimeout(stopTimeout);
        setStopTimeout(null);
      }
      
      toast.success('Recording stopped');
    }
  };
  

  const handleResetRecording = () => {
    // If we're currently recording, stop it first
    if (isRecording) {
      if (mediaRecorder && (mediaRecorder.state === 'recording' || mediaRecorder.state === 'paused')) {
        mediaRecorder.stop();
        
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop());
        }
        
        if (stopTimeout) {
          clearTimeout(stopTimeout);
          setStopTimeout(null);
        }
      }
    }
    
    // Reset state completely
    setIsRecording(false);
    setIsPaused(false);
    setMediaRecorder(null);
    setMediaStream(null);
    chunksRef.current = [];
    resetTimer();
    setShowOptions(true);
    setShowPreview(false);
    
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    
    setRecordingBlob(null);
    
    toast.info('Started new recording session');
  };

  const cancelRecording = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setIsPreparing(false);
    setCountdown(0);
    resetTimer();
    setShowOptions(true);
    toast.info('Recording canceled');
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
      
      // Notify library about the new video
      notifyLibraryUpdated();
      
      // Close the preview after successful upload
      setShowPreview(false);
      
      // Clean up
      cleanupRecording();
      // hideOverlay(); // Hide the overlay when done
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
    chunksRef.current = [];
    setShowOptions(true);
  };
  
  const handleDiscardRecording = () => {
    setShowDiscardConfirmation(true);
  };
  
  const confirmDiscard = () => {
    toast.success('Recording discarded');
    setShowDiscardConfirmation(false);
    setShowPreview(false);
    cleanupRecording();
    setShowOptions(true); // 👈 Show options again
    // hideOverlay();
  };
  
  
  const cancelDiscard = () => {
    setShowDiscardConfirmation(false);
  };

  const closeOverlay = () => {
    // Cancel any ongoing recording if active
    if (isRecording) {
      handleStopRecording();
    }
    
    if (isPreparing) {
      cancelRecording();
    }
    
    // Clean up
    cleanupRecording();
    hideOverlay();
  };

  // Determine if buttons should be disabled
  const controlsDisabled = !isRecording || showPreview;

  return (
    <div className="recording-overlay">
      <div className="recording-overlay__content">
        <div className="recording-overlay-main-contents">
          <div className="webcam-feed">
            <video id="webcam" ref={webcamRef} autoPlay playsInline></video>
             <button 
                className="camera-toggle" onClick={toggleCamera} title={isCameraOn ? "Turn camera off" : "Turn camera on"}>{isCameraOn ? <BsCameraVideo /> : <BsCameraVideoOff />}
              </button>
          </div>
          <div className="video-controls">
             <button 
               className={`record-button ${controlsDisabled ? 'disabled' : ''}`} 
               onClick={handleStopRecording} 
               disabled={controlsDisabled}
               title="Stop recording"
             >
               <FaStop />
             </button>
             <button 
               className={`pause-button ${controlsDisabled ? 'disabled' : ''}`} 
               onClick={handlePauseRecording}
               disabled={controlsDisabled}
               title={isPaused ? "Resume recording" : "Pause recording"}
             >
               {isPaused ? <FaPlay /> : <FaPause />}
             </button>
             <span id="timer">{formatTime(recordingTime)}</span>
             <button 
               className={`reset-button ${!isRecording && !showPreview ? 'disabled' : ''}`} 
               onClick={handleResetRecording} 
               disabled={!isRecording && !showPreview}
               title="Reset recording"
             >
               <RiResetLeftFill />
             </button>
             <button 
               className={`discard-button ${!isRecording && !showPreview ? 'disabled' : ''}`}
               onClick={handleDiscardRecording} 
               disabled={!isRecording && !showPreview}
               title="Discard recording"
             >
               <RiDeleteBinLine />
             </button>
          </div>
          {showOptions && (
            <div className="recording-options">
              <div className="recording-options-wrapper">
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
                      onChange={(e) => setSelectedMicId(e.target.value)}>
                      {micDevices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                          {device.label || `Mic ${device.deviceId.slice(-4)}`}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {isPreparing && countdown > 0 && (
            <div className="countdown-container">
              <div className="countdown-circle">
                <span className="countdown-number">{countdown}</span>
              </div>
              <p>Recording starts in {countdown} seconds</p>
              <button onClick={cancelRecording} className="cancel-button">Cancel</button>
            </div>
          )}
          
          {showPreview && (
            <div className="preview-container">
              <div className="preview-">
              <h3>Recording Preview</h3>
              <video src={previewUrl} controls autoPlay className="preview-video" />

              <div className="preview-actions">
                <button onClick={handleUploadRecording} className="upload-button" title="Upload recording">
                  <FaCloudUploadAlt />
                </button>
                <a href={previewUrl} download={`recording-${Date.now()}.webm`} title="Download recording">
                  <button className="download-button">
                    <FaDownload />
                  </button>
                </a>
                <button onClick={handleDiscardRecording} className="discard-button" title="Discard recording">
                  <RiDeleteBinLine />
                </button>
              </div>
              </div>
            </div>
          )}
        </div>
        
        {showDiscardConfirmation && (
          <div className="discard-modal">
            <div className="discard-content">
              <h3>Discard Recording?</h3>
              <p>Are you sure you want to discard this recording? This action cannot be undone.</p>
              <div className="discard-actions">
                <button onClick={confirmDiscard}>Yes, Discard</button>
                <button onClick={cancelDiscard}>No, Keep It</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button onClick={closeOverlay} className="close-overlay">
        <MdOutlineCancel />
      </button>
    </div>
  );
};

export default RecordingOverlay;