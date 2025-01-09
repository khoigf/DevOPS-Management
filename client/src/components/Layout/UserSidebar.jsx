import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Sidebar.css';
import { FaHome, FaProjectDiagram, FaLayerGroup, FaUsers, FaTools, FaCogs, FaBug, FaUserCog } from 'react-icons/fa';

const UserSidebar = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li>
                    <Link to="/dashboard">
                        <FaHome className="icon" /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/project">
                        <FaProjectDiagram className="icon" /> Project
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard">
                        <FaLayerGroup className="icon" /> Phase
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard">
                        <FaUsers className="icon" /> Member
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard">
                        <FaTools className="icon" /> DevOps Tool
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard">
                        <FaCogs className="icon" /> DevOps Config
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard">
                        <FaBug className="icon" /> Issue
                    </Link>
                </li>
                <li>
                    <Link to="/user/settings">
                        <FaUserCog className="icon" /> Settings
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default UserSidebar;
