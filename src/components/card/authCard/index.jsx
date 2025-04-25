import { useState } from 'react';
import './index.scss';
import { account } from '/src/lib/appwrite.js'

const AuthCard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGoogleLogin = () => {
        setLoading(true);
        setError('');
      
        // Redirect to Google login
        // account.createOAuth2Session(
        //   'google',
        //   'https://screen-record-nine.vercel.app/dashboard',
        //   'https://screen-record-nine.vercel.app/'
        // );

        account.createOAuth2Session(
            'google',
            'http://localhost:5173/dashboard',
            'http://localhost:5173/'
        );
      };
      

    return (
        <div className="auth-modal">
            <div className="auth-modal__header">
                <h1 className="auth-modal__title">Welcome to Stroomify</h1>
                {error && <div className="auth-modal__error">{error}</div>}
                <div className="auth-btn">
                    <button onClick={handleGoogleLogin} disabled={loading}>
                        <img src="/google.svg" alt="Google Icon" className="auth-btn__icon" />
                        {loading ? 'Loading...' : 'Continue with Google'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthCard;