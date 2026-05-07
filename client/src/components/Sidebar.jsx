import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>TTM</h2>
      </div>

      <nav className="sidebar-nav">
        <button onClick={() => navigate('/dashboard')} className="nav-item">
          📊 Dashboard
        </button>
        <button onClick={() => navigate('/projects')} className="nav-item">
          📁 Projects
        </button>
        <button onClick={() => navigate('/tasks')} className="nav-item">
          ✓ Tasks
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <img src={user?.avatar} alt={user?.name} className="user-avatar" />
          <div>
            <p className="user-name">{user?.name}</p>
            <p className="user-email">{user?.email}</p>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
