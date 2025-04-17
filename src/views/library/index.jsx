// import { useEffect, useState } from 'react';
// import { databases, storage, account, Query } from '/src/lib/appwrite';
// import { Link } from 'react-router-dom';
// import './index.scss'
// const Library = () => {
//   const [recordings, setRecordings] = useState([]);
//     const [user, setUser] = useState(null);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [showModal, setShowModal] = useState(false);
// const [selectedRecording, setSelectedRecording] = useState(null);


// useEffect(() => {
//     const fetchRecordings = async () => {
//       const databaseId = import.meta.env.VITE_DATABASE_ID;
//       const bucketId = import.meta.env.VITE_RECORDING_BUCKET_ID;
//       const collectionId = import.meta.env.VITE_COLLECTION_ID;
//       const user = await account.get();
      
//       // Fetch the documents from Appwrite database
//       const res = await databases.listDocuments(databaseId, collectionId, [
//         Query.equal('userId', user.$id),
//         Query.orderDesc('createdAt'),
//       ]);
  
//       const items = [];
      
//       // Loop through each document and check if the file exists in storage
//       for (const doc of res.documents) {
//         try {
//           // Check if the file exists in the storage bucket
//           const file = await storage.getFile(bucketId, doc.fileId);
//           if (file) {
//             // If the file exists, add the document to items with the URL
//             items.push({
//               ...doc,
//               url: storage.getFileDownload(bucketId, doc.fileId),
//             });
//           }
//         } catch (error) {
//           // If the file doesn't exist (Appwrite throws error), skip this document
//           console.error('File not found for document:', doc.$id);
//         }
//       }
  
//       // Set the updated recordings in state
//       setRecordings(items);
//     };
  
//     fetchRecordings();
//   }, []);
  


//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await account.get();
//         setUser(userData);
//       } catch (err) {
//         console.error("Failed to fetch user", err);
//       }
//     };
  
//     fetchUser();
//   }, []);


//   const handleDownload = (recording) => {
//     const link = document.createElement('a');
//     link.href = recording.url;
//     link.download = recording.title || 'recording.webm'; // fallback name
//     link.click();
//   };
  
  
// const confirmDelete = (recording) => {
//     setSelectedRecording(recording);
//     setShowModal(true);
//   };
  
// const handleDelete = async () => {
//     const recording = selectedRecording;
//     const bucketId = import.meta.env.VITE_RECORDING_BUCKET_ID;
//     const databaseId = import.meta.env.VITE_DATABASE_ID;
//     const collectionId = import.meta.env.VITE_COLLECTION_ID;
  
//     try {
//       await storage.deleteFile(bucketId, recording.fileId);
//     } catch (err) {
//       console.warn("File was already deleted or missing:", err?.message);
//       // optional: you can still proceed if the file doesn't exist
//     }
  
//     try {
//       await databases.deleteDocument(databaseId, collectionId, recording.$id);
//       setRecordings(prev => prev.filter(item => item.$id !== recording.$id));
//       setShowModal(false);
//       setSelectedRecording(null);
//     } catch (err) {
//       console.error("Failed to delete document:", err);
//       alert("Failed to delete recording. Try again.");
//     }
//   };
  



//   const handleLogout = async () => {
//     try {
//       await account.deleteSession('current');
//       window.location.href = '/';
//     } catch (err) {
//       console.error('Failed to logout:', err);
//     }
//   };

//   return (
//     <div className="library">
//         <header className="dashboard-header">
//             <div className="dashboard__header_wrapper">
//                 <div className="logo">
//                   <Link to="/dashboard">
//                     <img src="/logo.svg" alt="logo" />
//                   </Link>
//                 </div>
//                 {/* <button className="user-initial">
//                   {user?.prefs?.picture ? (
//                     <img src={user.prefs.picture}
//                     alt="User avatar"
//                     style={{width: 32, height: 32, borderRadius: '50%', objectFit: 'cover',}}/>
//                   ) : (
//                     <span>{user?.name?.charAt(0) || 'U'}</span>
//                   )}
//                 </button> */}
//                 <div className="user-profile">
//         <button
//           className="user-avatar"
//           onClick={() => setShowDropdown(prev => !prev)}
//         >
//           {user?.prefs?.picture ? (
//             <img
//               src={user.prefs.picture}
//               alt="User avatar"
//               style={{
//                 width: 32,
//                 height: 32,
//                 borderRadius: '50%',
//                 objectFit: 'cover',
//               }}
//             />
//           ) : (
//             <span>{user?.name?.charAt(0) || 'U'}</span>
//           )}
//         </button>
      
//         {showDropdown && (
//           <div className="user-dropdown">
//             <button onClick={handleLogout}>Sign out</button>
//             <button><Link to="/library">Library</Link></button>
//             <button>User Profile</button>
//           </div>
//         )}
//       </div>
//               </div>
//         </header>
//         <div className="library-content">
//         <h1 className='library-header'>Your Recordings</h1>
//       {recordings.length === 0 ? (
//         <p>No recordings yet. <br/>
//         Start a new recording to see it here.
//         </p>
//       ) : (
//         <div className="recordings-list">
//           {recordings.map(r => (
//             <div key={r.$id} className="recording-card">
//                 <video src={r.url} controls width="300" />
//                     <p>{r.title}</p>
//                     <span>{new Date(r.createdAt).toLocaleString()}</span>
//                     <div className="actions">
//                         <button onClick={() => handleDownload(r)}>Download</button>
//                         <button onClick={() => confirmDelete(r)}>Delete</button>
//                    </div>
//                 </div>
//             ))}
//         </div>
//       )}
//         </div>
//         {showModal && (
//         <div className="delete-modal-overlay">
//             <div className="delete-modal">
//                 <h2>Confirm Deletion</h2>
//                 <p>Are you sure you want to delete this recording?</p>
//                 <div className="delete-modal-actions">
//                     <button onClick={handleDelete} className="confirm-delete">Yes, Delete</button>
//                     <button onClick={() => setShowModal(false)} className="cancel-delete">Cancel</button>
//                 </div>
//             </div>
//         </div>
//     )}
//     </div>
//   );
// };

// export default Library;











// import { useEffect, useState } from 'react';
// import { databases, storage, account, Query } from '/src/lib/appwrite';
// import { Link } from 'react-router-dom';
// import './index.scss';

// // Simple caching mechanism
// const CACHE_KEY = 'library_recordings_cache';
// const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

// const Library = () => {
//   const [recordings, setRecordings] = useState([]);
//   const [user, setUser] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRecording, setSelectedRecording] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
        
//         // Fetch user data
//         const userData = await account.get();
//         setUser(userData);
        
//         // Try to load from cache first
//         const cachedData = checkCache();
//         if (cachedData) {
//           setRecordings(cachedData.recordings);
//           setIsLoading(false);
          
//           // If cache is getting old, refresh in background
//           if (Date.now() - cachedData.timestamp > CACHE_EXPIRY / 2) {
//             fetchRecordings(userData.$id, true);
//           }
//         } else {
//           // No valid cache, fetch from API
//           await fetchRecordings(userData.$id);
//         }
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const checkCache = () => {
//     try {
//       const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
//       if (cachedData && cachedData.timestamp && (Date.now() - cachedData.timestamp < CACHE_EXPIRY)) {
//         return cachedData;
//       }
//     } catch (err) {
//       console.warn('Cache reading error:', err);
//     }
//     return null;
//   };

//   const updateCache = (recordings) => {
//     try {
//       localStorage.setItem(CACHE_KEY, JSON.stringify({
//         recordings,
//         timestamp: Date.now()
//       }));
//     } catch (err) {
//       console.warn('Cache writing error:', err);
//     }
//   };

//   const fetchRecordings = async (userId, isBackgroundRefresh = false) => {
//     const databaseId = import.meta.env.VITE_DATABASE_ID;
//     const bucketId = import.meta.env.VITE_RECORDING_BUCKET_ID;
//     const collectionId = import.meta.env.VITE_COLLECTION_ID;
    
//     try {
//       // Fetch the documents from Appwrite database
//       const res = await databases.listDocuments(databaseId, collectionId, [
//         Query.equal('userId', userId),
//         Query.orderDesc('createdAt'),
//       ]);

//       const items = [];
      
//       for (const doc of res.documents) {
//         try {
//           items.push({
//             ...doc,
//             url: storage.getFileDownload(bucketId, doc.fileId),
//           });
//         } catch (error) {
//           console.error('Error processing document:', doc.$id, error);
//         }
//       }

//       // Update the state and cache
//       setRecordings(items);
//       updateCache(items);
      
//       // Only update loading state if this wasn't a background refresh
//       if (!isBackgroundRefresh) {
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error('Failed to fetch recordings:', error);
//       if (!isBackgroundRefresh) {
//         setIsLoading(false);
//       }
//     }
//   };

//   const clearCache = () => {
//     localStorage.removeItem(CACHE_KEY);
//   };

//   const handleDownload = (recording) => {
//     const link = document.createElement('a');
//     link.href = recording.url;
//     link.download = recording.title || 'recording.webm'; // fallback name
//     link.click();
//   };
  
//   const confirmDelete = (recording) => {
//     setSelectedRecording(recording);
//     setShowModal(true);
//   };
  
//   const handleDelete = async () => {
//     const recording = selectedRecording;
//     const bucketId = import.meta.env.VITE_RECORDING_BUCKET_ID;
//     const databaseId = import.meta.env.VITE_DATABASE_ID;
//     const collectionId = import.meta.env.VITE_COLLECTION_ID;
  
//     try {
//       await storage.deleteFile(bucketId, recording.fileId);
//     } catch (err) {
//       console.warn("File was already deleted or missing:", err?.message);
//     }
  
//     try {
//       await databases.deleteDocument(databaseId, collectionId, recording.$id);
//       const updatedRecordings = recordings.filter(item => item.$id !== recording.$id);
//       setRecordings(updatedRecordings);
//       updateCache(updatedRecordings); // Update cache after deletion
//       setShowModal(false);
//       setSelectedRecording(null);
//     } catch (err) {
//       console.error("Failed to delete document:", err);
//       alert("Failed to delete recording. Try again.");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       clearCache(); // Clear cache on logout
//       await account.deleteSession('current');
//       window.location.href = '/';
//     } catch (err) {
//       console.error('Failed to logout:', err);
//     }
//   };

//   // Skeleton loading component
//   const RecordingSkeleton = () => (
//     <div className="recording-card skeleton">
//       <div className="skeleton-video"></div>
//       <div className="skeleton-title"></div>
//       <div className="skeleton-date"></div>
//       <div className="skeleton-actions">
//         <div className="skeleton-button"></div>
//         <div className="skeleton-button"></div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="library">
//       <header className="dashboard-header">
//         <div className="dashboard__header_wrapper">
//           <div className="logo">
//             <Link to="/dashboard">
//               <img src="/logo.svg" alt="logo" />
//             </Link>
//           </div>
//           <div className="user-profile">
//             <button
//               className="user-avatar"
//               onClick={() => setShowDropdown(prev => !prev)}
//             >
//               {user?.prefs?.picture ? (
//                 <img
//                   src={user.prefs.picture}
//                   alt="User avatar"
//                   style={{
//                     width: 32,
//                     height: 32,
//                     borderRadius: '50%',
//                     objectFit: 'cover',
//                   }}
//                 />
//               ) : (
//                 <span>{user?.name?.charAt(0) || 'U'}</span>
//               )}
//             </button>
          
//             {showDropdown && (
//               <div className="user-dropdown">
//                 <button onClick={handleLogout}>Sign out</button>
//                 <button><Link to="/library">Library</Link></button>
//                 <button>User Profile</button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>
      
//       <div className="library-content">
//         <h1 className='library-header'>Your Recordings</h1>
        
//         {isLoading ? (
//           <div className="recordings-list">
//             {/* Display skeleton loaders while content loads */}
//             {Array.from({ length: 3 }).map((_, index) => (
//               <RecordingSkeleton key={index} />
//             ))}
//           </div>
//         ) : recordings.length === 0 ? (
//           <p>No recordings yet. <br/>
//           Start a new recording to see it here.
//           </p>
//         ) : (
//           <div className="recordings-list">
//             {recordings.map(r => (
//               <div key={r.$id} className="recording-card">
//                 <video 
//                   src={r.url} 
//                   controls 
//                   width="300"
//                   preload="metadata"
//                   poster="/video-placeholder.png" // Optional: Add a placeholder image
//                 />
//                 <p>{r.title}</p>
//                 <span>{new Date(r.createdAt).toLocaleString()}</span>
//                 <div className="actions">
//                   <button onClick={() => handleDownload(r)}>Download</button>
//                   <button onClick={() => confirmDelete(r)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
      
//       {showModal && (
//         <div className="delete-modal-overlay">
//           <div className="delete-modal">
//             <h2>Confirm Deletion</h2>
//             <p>Are you sure you want to delete this recording?</p>
//             <div className="delete-modal-actions">
//               <button onClick={handleDelete} className="confirm-delete">Yes, Delete</button>
//               <button onClick={() => setShowModal(false)} className="cancel-delete">Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Library;





















import { useEffect, useState } from 'react';
import { databases, storage, account, Query } from '/src/lib/appwrite';
import { Link } from 'react-router-dom';
import './index.scss';

// Simple caching mechanism
const CACHE_KEY = 'library_recordings_cache';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

const Library = () => {
  const [recordings, setRecordings] = useState([]);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoErrors, setVideoErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch user data
        const userData = await account.get();
        setUser(userData);
        
        // Always fetch fresh data from server
        await fetchRecordings(userData.$id);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setIsLoading(false);
      }
    };

    // Clear any existing cache to avoid stale data
    clearCache();
    fetchData();
  }, []);

  const checkCache = () => {
    try {
      const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (cachedData && cachedData.timestamp && (Date.now() - cachedData.timestamp < CACHE_EXPIRY)) {
        return cachedData;
      }
    } catch (err) {
      console.warn('Cache reading error:', err);
    }
    return null;
  };

  const updateCache = (recordings) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        recordings,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.warn('Cache writing error:', err);
    }
  };

  const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
  };

  const fetchRecordings = async (userId, isBackgroundRefresh = false) => {
    const databaseId = import.meta.env.VITE_DATABASE_ID;
    const bucketId = import.meta.env.VITE_RECORDING_BUCKET_ID;
    const collectionId = import.meta.env.VITE_COLLECTION_ID;
    
    try {
      // Fetch the documents from Appwrite database
      const res = await databases.listDocuments(databaseId, collectionId, [
        Query.equal('userId', userId),
        Query.orderDesc('createdAt'),
      ]);

      const items = [];
      
      // Process each document and validate file exists
      for (const doc of res.documents) {
        try {
          // Try to get file info to validate it exists
          await storage.getFile(bucketId, doc.fileId);
          
          // If no error, file exists so add it to items
          items.push({
            ...doc,
            url: storage.getFileDownload(bucketId, doc.fileId),
          });
        } catch (error) {
          console.error('File not found for document:', doc.$id);
          
          // Optionally, delete orphaned document if file doesn't exist
          try {
            await databases.deleteDocument(databaseId, collectionId, doc.$id);
            console.log('Deleted orphaned document:', doc.$id);
          } catch (err) {
            console.error('Failed to delete orphaned document:', err);
          }
        }
      }

      // Update the state and cache
      setRecordings(items);
      updateCache(items);
      
      // Only update loading state if this wasn't a background refresh
      if (!isBackgroundRefresh) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch recordings:', error);
      if (!isBackgroundRefresh) {
        setIsLoading(false);
      }
    }
  };

  const handleVideoError = (recordingId) => {
    // Keep track of videos with errors
    setVideoErrors(prev => ({
      ...prev,
      [recordingId]: true
    }));

    // Remove this recording from state and cache
    const updatedRecordings = recordings.filter(r => r.$id !== recordingId);
    setRecordings(updatedRecordings);
    updateCache(updatedRecordings);
  };

  const handleDownload = (recording) => {
    const link = document.createElement('a');
    link.href = recording.url;
    link.download = recording.title || 'recording.webm'; // fallback name
    link.click();
  };
  
  const confirmDelete = (recording) => {
    setSelectedRecording(recording);
    setShowModal(true);
  };
  
  const handleDelete = async () => {
    const recording = selectedRecording;
    const bucketId = import.meta.env.VITE_RECORDING_BUCKET_ID;
    const databaseId = import.meta.env.VITE_DATABASE_ID;
    const collectionId = import.meta.env.VITE_COLLECTION_ID;
  
    try {
      await storage.deleteFile(bucketId, recording.fileId);
    } catch (err) {
      console.warn("File was already deleted or missing:", err?.message);
    }
  
    try {
      await databases.deleteDocument(databaseId, collectionId, recording.$id);
      const updatedRecordings = recordings.filter(item => item.$id !== recording.$id);
      setRecordings(updatedRecordings);
      updateCache(updatedRecordings); // Update cache after deletion
      setShowModal(false);
      setSelectedRecording(null);
    } catch (err) {
      console.error("Failed to delete document:", err);
      alert("Failed to delete recording. Try again.");
    }
  };

  const handleLogout = async () => {
    try {
      clearCache(); // Clear cache on logout
      await account.deleteSession('current');
      window.location.href = '/';
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  // Skeleton loading component
  const RecordingSkeleton = () => (
    <div className="recording-card skeleton">
      <div className="skeleton-video"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-date"></div>
      <div className="skeleton-actions">
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );

  // Force refresh of library
  const refreshLibrary = async () => {
    if (!user) return;
    
    setIsLoading(true);
    clearCache();
    await fetchRecordings(user.$id);
  };

  return (
    <div className="library">
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
      
      <div className="library-content">
        <div className="library-header-container">
          <h1 className='library-header'>Your Recordings</h1>
          <button onClick={refreshLibrary} className="refresh-button">
            Refresh
          </button>
        </div>
        
        {isLoading ? (
          <div className="recordings-list">
            {/* Display skeleton loaders while content loads */}
            {Array.from({ length: 3 }).map((_, index) => (
              <RecordingSkeleton key={index} />
            ))}
          </div>
        ) : recordings.length === 0 ? (
          <p>No recordings yet. <br/>
          Start a new recording to see it here.
          </p>
        ) : (
          <div className="recordings-list">
            {recordings.map(r => (
              <div key={r.$id} className="recording-card">
                <video 
                  src={r.url} 
                  controls 
                  width="300"
                  preload="metadata"
                  poster="/video-placeholder.png" // Optional: Add a placeholder image
                  onError={() => handleVideoError(r.$id)}
                />
                <p>{r.title}</p>
                <span>{new Date(r.createdAt).toLocaleString()}</span>
                <div className="actions">
                  <button onClick={() => handleDownload(r)}>Download</button>
                  <button onClick={() => confirmDelete(r)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {showModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this recording?</p>
            <div className="delete-modal-actions">
              <button onClick={handleDelete} className="confirm-delete">Yes, Delete</button>
              <button onClick={() => setShowModal(false)} className="cancel-delete">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;