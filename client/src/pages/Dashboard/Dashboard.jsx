import React, { useContext } from 'react';
import '../../assets/styles/dashboard.css'; // CSS cho Dashboard
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="user-dashboard">
            <header className="dashboard-header">
                <h1>Welcome to Your Dashboard</h1>
                <p>Track your progress, manage your tasks, and stay updated.</p>
            </header>
            <button onClick={handleLogout}>Logout</button>
            <div className="dashboard-content">
                {/* Thống kê tổng quan */}
                <div className="dashboard-widgets">
                    <div className="widget">
                        <h3>Your Projects</h3>
                        <p>10</p>
                    </div>
                    <div className="widget">
                        <h3>Tasks Completed</h3>
                        <p>45</p>
                    </div>
                    <div className="widget">
                        <h3>Pending Tasks</h3>
                        <p>5</p>
                    </div>
                </div>
                {/* Link nhanh tới các chức năng */}
                <div className="dashboard-actions">
                    <button className="action-btn">View My Projects</button>
                    <button className="action-btn">Manage Tasks</button>
                    <button className="action-btn">Profile Settings</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
