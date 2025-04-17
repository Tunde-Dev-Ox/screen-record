// src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { account } from '../lib/appwrite';

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
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
