import React, { useContext } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import { AuthContext } from '../../contexts/AuthContext';
import '../../assets/styles/AdminDashboard.css';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="admin-dashboard">
            <Navbar />
            <div>
                <Sidebar />
                <div className="dashboard-profile">
                  <div className="profile-card">
                    <h1>Profile</h1>
                    <div className="profile-detail">
                      <strong>Name:</strong> <span>{user.name}</span>
                    </div>
                    <div className="profile-detail">
                      <strong>User ID:</strong> <span>{user.userId}</span>
                    </div>
                    <div className="profile-detail">
                      <strong>Role:</strong> <span>{user.role}</span>
                    </div>
                  </div>
                </div>
            </div>
    </div>
  );
};

export default ProfilePage;