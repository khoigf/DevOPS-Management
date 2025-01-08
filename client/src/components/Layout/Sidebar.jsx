import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li><Link to="/admin-dashboard">Dashboard</Link></li>
                <li><Link to="/admin-dashboard/users">Manage Users</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        </aside>
    );
};

export default Sidebar;