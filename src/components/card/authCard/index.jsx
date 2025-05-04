import { useState } from 'react';
import './index.scss';
import { account } from '/src/lib/appwrite.js';
import { useUser } from '../../../context/index';

const AuthCard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setUser } = useUser();

    const handleGoogleLogin = () => {
        setLoading(true);
        setError('');
      
        account.createOAuth2Session(
            // 'google',
            // 'http://localhost:5173/dashboard',
            // 'http://localhost:5173/'

            'google',
            'https://screen-record-nine.vercel.app/dashboard',
            'https://screen-record-nine.vercel.app/'

        ).catch(err => {
            console.error("Failed to initiate OAuth:", err);
            setError('Failed to start login process. Please try again.');
            setLoading(false);
        });
    };
      
    return (
        <div className="auth-modal">
            <div className="auth-modal__header">
                <h1 className="auth-modal__title">Welcome to Stroomify</h1>
                {error && <div className="auth-modal__error">{error}</div>}
                <div className="auth-btn">
                    <button onClick={handleGoogleLogin} disabled={loading}>
                        <img src="/google.svg" alt="Google Icon" className="auth-btn__icon" />
                        {loading ? 'Redirecting to Google...' : 'Continue with Google'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthCard;