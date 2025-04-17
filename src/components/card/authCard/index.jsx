import { useState } from 'react';
import './index.scss';
import { account } from '/src/lib/appwrite.js'  // import the appwrite client

const AuthCard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // const handleGoogleLogin = async () => {
    //     setLoading(true);
    //     setError('');
        
    //     try {
    //         // Redirect to Google OAuth2 login page
    //         const response = await account.createOAuth2Session('google');
    //         // Redirect or handle successful login
    //         console.log('Login successful', response);
    //         // Example: Redirect to another page or dashboard after successful login
    //         // window.location.href = '/dashboard';
    //     } catch (err) {
    //         setError('Login failed. Please try again.');
    //         console.error(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleGoogleLogin = () => {
        setLoading(true);
        setError('');
      
        // Redirect to Google login
        account.createOAuth2Session(
          'google',
          'https://screen-recording-zeta.vercel.app/dashboard',
          'https://screen-recording-zeta.vercel.app/'
        );
      };
      

    return (
        <div className="auth-modal">
            <div className="auth-modal__header">
                <h1 className="auth-modal__title">Welcome to Screenbox</h1>
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