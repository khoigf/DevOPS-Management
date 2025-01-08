import React, { useContext } from 'react';
import UserNavbar from '../../components/Layout/UserNavbar';
import UserSidebar from '../../components/Layout/UserSidebar';
import { AuthContext } from '../../contexts/AuthContext';
import '../../assets/styles/user/UserDashboard.css'; // CSS for Dashboard

const UserProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="user-dashboard">
      <UserNavbar />
        <div>
            <UserSidebar />
            <div className="dashboard-profile" style={{backgroundColor: '#ccc'}}>
                <div className="profile-card" style={{backgroundColor: 'white'}}>
                    <h1>Profile</h1>
                    <div className="profile-detail">
                      <strong>Name:</strong> <span>{user.name}</span>
                    </div>
                    <div className="profile-detail">
                      <strong>Email:</strong> <span>{user.mail}</span>
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

export default UserProfilePage;