import React from 'react';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-blue-600">Newborn ERP</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-slate-700">
          Hello, {user?.name}
        </span>
        <Button variant="secondary" onClick={handleLogout} className="text-sm px-3 py-1.5 rounded-xl">
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
