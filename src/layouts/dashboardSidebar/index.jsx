// import { Link } from 'react-router-dom';
// import './index.scss';
// import { FaHome } from 'react-icons/fa';
// import { LuLibraryBig } from 'react-icons/lu';
// import { FaPerson } from 'react-icons/fa6';
// import { CiLogout } from 'react-icons/ci';
// import { CiVideoOn } from 'react-icons/ci';
// import { useRecording } from '../../hooks/useRecording';
// import { useNavigate } from 'react-router-dom';
// import { account } from '/src/lib/appwrite';
// import { useUser } from '../../context/index.js';


// const DashboardSidebar = () => {
//     const { showOverlay} = useRecording();
//     const navigate = useNavigate();
//     const { user } = useUser();
//     const handleLogout = async () => {
//         try {
//             await account.deleteSession('current'); // Logs out current session
//             user(null);                          // Clear user from context
//             navigate('/');                          // Redirect to login or landing page
//         } catch (err) {
//             console.error('Logout failed:', err);
//         }
//     };

//     return (
//         <div className="dashboard-sidebar">
//             <div className="sidebar_logo">
//                 <Link to="/dashboard">
//                     <img src="/logo.svg" alt="logo" />
//                     <span>
//                         Stroomify
//                     </span>
//                 </Link>
//             </div>
//             <ul>
//                 <li>
//                     <FaHome />
//                     <Link to="/dashboard">Home</Link>
//                 </li>
//                 <li>
//                     <LuLibraryBig />
//                     <Link to="/dashboard/library">My Library</Link>
//                 </li>
//                 {/* <li>
//                     <FaBell />
//                     <Link to="/dashboard/notifications">Notifications</Link>
//                 </li> */}
//                 {/* <li>
//                     <FaBook/>
//                     <Link to="/dashboard/courses">Courses</Link>
//                 </li> */}
//                 <li>
//                     <FaPerson />
//                     <Link to="/dashboard/profile">Profile</Link>
//                 </li>
//                 <li className="sidebar-logout" onClick={handleLogout}>
//                     <CiLogout />
//                     <span>
//                         Logout
//                     </span>
//                 </li>
//             </ul>
//             <div className="sidebar-record__btn" onClick={showOverlay}>
//                 <button>
//                     <CiVideoOn />
//                     <span>
//                         Record a video
//                     </span>
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default DashboardSidebar;
















import { Link } from 'react-router-dom';
import './index.scss';
import { FaHome } from 'react-icons/fa';
import { LuLibraryBig } from 'react-icons/lu';
import { FaPerson } from 'react-icons/fa6';
import { CiLogout } from 'react-icons/ci';
import { CiVideoOn } from 'react-icons/ci';
import { useRecording } from '../../hooks/useRecording';
import { useNavigate } from 'react-router-dom';
import { account } from '/src/lib/appwrite';
import { useUser } from '../../context/index.js';

const DashboardSidebar = () => {
    const { showOverlay } = useRecording();
    const navigate = useNavigate();
    const { user, setUser } = useUser(); // Get both user and setUser from context
    
    const handleLogout = async () => {
        try {
            await account.deleteSession('current'); // Logs out current session
            setUser(null);                          // Clear user from context using setUser function
            navigate('/');                          // Redirect to login or landing page
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <div className="dashboard-sidebar">
            <div className="sidebar_logo">
                <Link to="/dashboard">
                    <img src="/logo.svg" alt="logo" />
                    <span>
                        Stroomify
                    </span>
                </Link>
            </div>
            <ul>
                <li>
                    <FaHome />
                    <Link to="/dashboard">Home</Link>
                </li>
                <li>
                    <LuLibraryBig />
                    <Link to="/dashboard/library">My Library</Link>
                </li>
                <li>
                    <FaPerson />
                    <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li className="sidebar-logout" onClick={handleLogout}>
                    <CiLogout />
                    <span>
                        Logout
                    </span>
                </li>
            </ul>
            <div className="sidebar-record__btn" onClick={showOverlay}>
                <button>
                    <CiVideoOn />
                    <span>
                        Record a video
                    </span>
                </button>
            </div>
        </div>
    )
}

export default DashboardSidebar;