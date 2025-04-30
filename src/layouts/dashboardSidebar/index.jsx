import { Link } from 'react-router-dom';
import './index.scss';
import { FaBell, FaBook, FaHome } from 'react-icons/fa';
import { LuLibraryBig } from 'react-icons/lu';
import { FaPerson } from 'react-icons/fa6';
import { CiLogout } from 'react-icons/ci';
import { CiVideoOn } from 'react-icons/ci';
import { useRecording } from '../../hooks/useRecording';

const DashboardSidebar = () => {
    const { showOverlay} = useRecording();
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
                    <FaBell />
                    <Link to="/dashboard/notifications">Notifications</Link>
                </li>
                <li>
                    <FaBook/>
                    <Link to="/dashboard/courses">Courses</Link>
                </li>
                <li>
                    <FaPerson />
                    <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li>
                    <CiLogout />
                    <Link to="/logout">Logout</Link>
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