import { useState } from 'react';
import AdminLogin from './AdminLogin';
import SuperAdmin from '../Dashboard/SuperAdmin';

const AdminPortal = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const handleLogin = (userData) => {
    setAdminUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setAdminUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLogin={handleLogin}
        onBack={onBack}
      />
    );
  }

  return (
    <SuperAdmin 
      adminUser={adminUser}
      onLogout={handleLogout}
    />
  );
};

export default AdminPortal;
