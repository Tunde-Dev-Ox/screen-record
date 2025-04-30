import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { account } from '../lib/appwrite';
import './LoadingSpinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <motion.div
          className="spinner-container"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="loading-text"
        >
          Loading your stroom
        </motion.div>
        
        <motion.div 
          className="progress-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="progress-bar"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await account.get();  // Fetch user session
        setUser(res);
      } catch (err) {
        setUser(null);  // Not logged in
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 600); // Add a small delay for a smoother transition
      }
    };

    checkAuth();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {user ? children : <Navigate to="/" replace />}
    </motion.div>
  );
};

export default ProtectedRoute;
