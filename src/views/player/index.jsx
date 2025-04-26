// VideoPlayerPage.jsx
import { useLocation, useNavigate } from 'react-router-dom';

export default function VideoPlayerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoUrl } = location.state || {};

  if (!videoUrl) {
    return <p>No video selected.</p>;
  }

  return (
    <div style={{ backgroundColor: 'black', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'transparent',
          color: 'white',
          border: 'none',
          fontSize: '1.5rem',
          padding: '1rem',
          cursor: 'pointer',
          alignSelf: 'flex-start',
        }}
      >
        ← Back
      </button>
      <video
        src={videoUrl}
        controls
        autoPlay
        style={{ flex: 1, width: '100%', objectFit: 'contain' }}
      />
    </div>
  );
}
