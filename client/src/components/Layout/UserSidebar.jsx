import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProjectSelectionModal from '../../components/ProjectSelectionModal'; // Modal for project selection
import '../../assets/styles/Sidebar.css';
import { FaHome, FaProjectDiagram, FaLayerGroup, FaUsers, FaTools, FaCogs, FaBug, FaUserCog } from 'react-icons/fa';

const UserSidebar = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedProject = localStorage.getItem('selectedProject');
        if (storedProject) {
            setSelectedProject(JSON.parse(storedProject));
        }
    }, []);

    const handleRestrictedNavigation = (path) => {
        if (selectedProject) {
            navigate('/project' + path);
        } else {
            setShowProjectModal(true);
        }
    };

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
        localStorage.setItem('selectedProject', JSON.stringify(project));
        setShowProjectModal(false);
        window.location.reload();
    };

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
                        <FaProjectDiagram className="icon" /> Project:
                    </Link>
                    <button className="change-project-btn" onClick={() => setShowProjectModal(true)}>
                        {selectedProject ? `${selectedProject.name}` : 'Choose Project'}
                    </button>
                </li>
                <li>
                    <button className="sidebar-link" onClick={() => handleRestrictedNavigation('/phase')}>
                        <FaLayerGroup className="icon" /> Phase
                    </button>
                </li>
                <li>
                    <button className="sidebar-link" onClick={() => handleRestrictedNavigation('/member')}>
                        <FaUsers className="icon" /> Member
                    </button>
                </li>
                <li>
                    <button className="sidebar-link" onClick={() => handleRestrictedNavigation('/devops-tool')}>
                        <FaTools className="icon" /> DevOps Tool
                    </button>
                </li>
                <li>
                    <button className="sidebar-link" onClick={() => handleRestrictedNavigation('/devops-config')}>
                        <FaCogs className="icon" /> DevOps Config
                    </button>
                </li>
                <li>
                    <button className="sidebar-link" onClick={() => handleRestrictedNavigation('/issue')}>
                        <FaBug className="icon" /> Issue
                    </button>
                </li>
                <li>
                    <Link to="/user/settings">
                        <FaUserCog className="icon" /> Settings
                    </Link>
                </li>
            </ul>

            {/* Project selection modal */}
            {showProjectModal && (
                <ProjectSelectionModal
                    onSelect={handleProjectSelect}
                    onClose={() => setShowProjectModal(false)}
                />
            )}
        </aside>
    );
};

export default UserSidebar;