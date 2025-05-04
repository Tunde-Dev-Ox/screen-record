import './index.scss';
import { useState, useEffect } from 'react';
// import {Link} from 'react-router-dom';
import { account } from '/src/lib/appwrite.js';
import mixpanel from '/src/lib/mixpanel.js';
import DashboardLayout from '../../layouts/dashboardLayout';
import RecordingOverlay from '../../components/recordingOverlay';
import { useRecording } from '../../hooks/useRecording';


const Dashboard = () => {

  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);

        if (userData.name) {
          const firstNameOnly = userData.name.split(' ')[0];
          setFirstName(firstNameOnly);
        }

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


  const { isOverlayVisible } = useRecording();

  return (
    <>
      <DashboardLayout>
      <div className="dashboard-main">
          <div className="dashboard-empty-state">
            <img src="/37Z_2105.w007.n001.12B.p8.12.jpg" alt="empty state" />
            <h2>
              Hi, {firstName ? firstName : 'there'}! Skip the meeting, share your screen.
            </h2>
            <p>
              Start recording in seconds and keep your team in the loop — without slowing down.
            </p>
            <button className='dashboard__start-recording'>
            <span>
              Watch our demo videos
            </span>
            </button>
          </div>
        {isOverlayVisible && <RecordingOverlay />}
      </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;