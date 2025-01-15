import React, { useEffect, useState } from 'react';
import '../assets/styles/ProjectSelectionModal.css'; // Add styles for your modal
import { API_BASE_URL } from '../utils/apiConfig';

const ProjectSelectionModal = ({ onSelect, onClose }) => {
    const [projects, setProjects] = useState([]);
    const getUserId = () => {
        const user = JSON.parse(localStorage.getItem('user')); // Save userId in localStorage on login
        return user?.userId || null;
      };
    
    const getAccessToken = () => {
        const tokens = JSON.parse(localStorage.getItem('tokens')); // Token stored as JSON object
        return tokens?.accessToken || '';
    };
    useEffect(() => {
        const userId = getUserId();
        const token = getAccessToken();
        const fetchProjects = async () => {
            const response = await fetch(`${API_BASE_URL}/user/projects/all/${userId}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setProjects(data);
        };
        fetchProjects();
    }, []);

    return (
        <div className="project-modal">
            <div className="project-modal-content" style={{ color: 'black' }}>
                <h2>Select a Project</h2>
                <ul className="project-list">
                    {projects.map((project) => (
                        <li key={project._id} onClick={() => onSelect(project)}>
                            {project.name}
                        </li>
                    ))}
                </ul>
                <button className="close-btn" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ProjectSelectionModal;
