import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Sidebar.css';
import { FaHome, FaUsersCog, FaCogs } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li>
                    <Link to="/admin-dashboard">
                        <FaHome className="icon" /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/admin-dashboard/users">
                        <FaUsersCog className="icon" /> Manage Users
                    </Link>
                </li>
                <li>
                    <Link to="/settings">
                        <FaCogs className="icon" /> Settings
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
