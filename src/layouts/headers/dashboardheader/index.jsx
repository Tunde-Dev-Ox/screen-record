import './index.scss';
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
    return (
        <>
            <header className="dashboard-header">
                <div className="dashboard__header_wrapper">
                    <div className="video_search">
                        <input type="text" placeholder="Search for your videos" />
                        {/* <button type="submit">
                          <FaSearch />
                        </button> */}
                    </div>
                    <div className="dashboard_header__btns">
                    <div className="video-count">
                        <button>
                            1/30 videos
                        </button>
                        <span className="video-count-line">
                        </span>
                    </div>
                    <div className="upgrade__button">
                        <Link to="/upgrade">
                            Upgrade
                        </Link>
                    </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default DashboardHeader;