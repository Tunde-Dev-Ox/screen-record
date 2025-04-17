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

























import { useEffect, useState } from 'react';
import { databases, storage, account, Query } from '/src/lib/appwrite';
import { Link } from 'react-router-dom';
import './index.scss';

const Library = () => {
  const [recordings, setRecordings] = useState([]);
  const [videoUrls, setVideoUrls] = useState({});
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // // const fetchUserAndRecordings = async () => {
    //   const databaseId = import.meta.env.VITE_DATABASE_ID;
    //   const bucketId = import.meta.env.VITE_RECORDING_BUCKET_ID;
    //   const collectionId = import.meta.env.VITE_COLLECTION_ID;

    //   try {
    //     const userData = await account.get();
    //     setUser(userData);

    //     const res = await databases.listDocuments(databaseId, collectionId, [
    //       Query.equal('userId', userData.$id),
    //       Query.orderDesc('createdAt'),
    //     ]);

    //     const items = [];
    //     const urls = {};

    //     for (const doc of res.documents) {
    //       try {
    //         const file = await storage.getFile(bucketId, doc.fileId);
    //         if (file) {
    //           const url = storage.getFileDownload(bucketId, doc.fileId);
    //           urls[doc.fileId] = url.href;
    //           items.push({ ...doc });
    //         }
    //       } catch (error) {
    //         console.error('File not found for document:', doc.$id);
    //       }
    //     }

    //     setRecordings(items);
    //     setVideoUrls(urls);
    //     setLoading(false);
    //   } catch (err) {
    //     console.error("Error fetching data:", err);
    //     setLoading(false);
    //   }
    // };



    const fetchUserAndRecordings = async () => {
      const databaseId = import.meta.env.VITE_DATABASE_ID;
      const bucketId = import.meta.env.VITE_RECORDING_BUCKET_ID;
      const collectionId = import.meta.env.VITE_COLLECTION_ID;
    
      try {
        const userData = await account.get();
        setUser(userData);
    
        const res = await databases.listDocuments(databaseId, collectionId, [
          Query.equal('userId', userData.$id),
          Query.orderDesc('createdAt'),
        ]);
    
        const items = [];
        const urls = {};
    
        for (const doc of res.documents) {
          try {
            const file = await storage.getFile(bucketId, doc.fileId);
            if (file) {
              const url = await storage.getFileDownload(bucketId, doc.fileId);  // Await the promise for URL
              urls[doc.fileId] = url.href;
              items.push({ ...doc });
            }
          } catch (error) {
            console.error('File not found for document:', doc.$id);
          }
        }
    
        setRecordings(items);
        setVideoUrls(urls);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
    
    fetchUserAndRecordings();
  }, []);

  const handleDownload = (recording) => {
    const link = document.createElement('a');
    link.href = videoUrls[recording.fileId];
    link.download = recording.title || 'recording.webm';
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
      setRecordings(prev => prev.filter(item => item.$id !== recording.$id));
      setShowModal(false);
      setSelectedRecording(null);
    } catch (err) {
      console.error("Failed to delete document:", err);
      alert("Failed to delete recording. Try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      window.location.href = '/';
    } catch (err) {
      console.error('Failed to logout:', err);
    }
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
            <button className="user-avatar" onClick={() => setShowDropdown(prev => !prev)}>
              {user?.prefs?.picture ? (
                <img
                  src={user.prefs.picture}
                  alt="User avatar"
                  style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
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
        <h1 className='library-header'>Your Recordings</h1>
        {loading ? (
          <p>Loading your recordings...</p>
        ) : recordings.length === 0 ? (
          <p>No recordings yet. <br/> Start a new recording to see it here.</p>
        ) : (
          <div className="recordings-list">
            {recordings.map(r => (
              <div key={r.$id} className="recording-card">
                {!videoUrls[r.fileId] ? (
                  <div className="video-skeleton" style={{ width: 300, height: 170, background: '#ccc', borderRadius: 8 }} />
                ) : (
                  <video src={videoUrls[r.fileId]} controls width="300" />
                )}
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