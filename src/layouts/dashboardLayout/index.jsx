import DashboardHeader from '../headers/dashboardheader';
import DashboardSidebar from '../../layouts/dashboardSidebar';
import './index.scss';

const DashboardLayout = ({children}) => {
    return (
        <div className="dashboard-layout">
            <DashboardSidebar />
            <div className="dashboard-layout__content">
                <DashboardHeader />
                <div className="dashboard-layout__children">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;