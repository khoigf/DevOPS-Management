import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Sidebar.css';

const UserSidebar = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/dashboard">Manage Project</Link></li>
                <li><Link to="/dashboard">Settings</Link></li>
            </ul>
        </aside>
    );
};

export default UserSidebar;