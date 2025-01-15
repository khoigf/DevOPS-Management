import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Layout/UserNavbar';
import Sidebar from '../../components/Layout/UserSidebar';
import '../../assets/styles/user/UserDashboard.css'; // Project Management styles
import { API_BASE_URL } from '../../utils/apiConfig';

const ConfigManagement = () => {
    const [configs, setConfigs] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1); // Current page
    const [itemsPerPage] = useState(5); // Items per page
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editConfigId, setEditConfigId] = useState(null);
    const [deleteConfigId, setDeleteConfigId] = useState(null);
    const [configForm, setConfigForm] = useState({
        name: '',
        value: '',
    });
    const [selectedConfig, setSelectedConfig] = useState(null); // For viewing config details
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const getAccessToken = () => {
        const tokens = JSON.parse(localStorage.getItem('tokens'));
        return tokens?.accessToken || '';
    };
    // Filter and paginate configurations
    const filteredConfigs = configs.filter((config) =>
        config.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalItems = filteredConfigs.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const currentPageConfigs = filteredConfigs.slice(startIndex, startIndex + itemsPerPage);

    // Handle pagination
    const goToPage = (pageNumber) => {
        setPage(pageNumber);
    };


    const fetchConfigs = async () => {
        try {
            const projectId = selectedProject._id;
            const token = getAccessToken();
            if (!projectId) {
                setMessage('Project not found.');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/user/projects/config/all/${projectId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setConfigs(data);
            } else {
                setMessage('Error fetching configurations.');
            }
        } catch (error) {
            setMessage('Error fetching configurations.');
        }
    };
    const fetchConfigById = async (configId) => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/config/${configId}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setSelectedConfig(data);
                setShowDetailsModal(true);
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('Error fetching configuration details.');
        }
    };

    const handleAddConfig = async () => {
        try {
            const projectId = selectedProject._id;
            const token = getAccessToken();
            if (!projectId) {
                setMessage('Project not found.');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/user/projects/config/${projectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(configForm),
            });

            if (response.ok) {
                setMessage('Configuration added successfully.');
                fetchConfigs(); // Refresh the list of configurations
                closeModal();
            } else {
                setMessage('Error adding configuration.');
            }
        } catch (error) {
            setMessage('Error adding configuration.');
        }
    };

    const handleEditConfig = async () => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/config/${editConfigId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(configForm),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Configuration updated successfully.');
                fetchConfigs();
                closeModal();
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('Error updating configuration.');
        }
    };

    const handleDeleteConfig = async () => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/config/${deleteConfigId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Configuration deleted successfully.');
                fetchConfigs();
                closeModal();
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('Error deleting configuration.');
        }
        setShowConfirmModal(false);
    };

    const handleSubmit = () => {
        if (editMode) {
            handleEditConfig();
        } else {
            handleAddConfig();
        }
    };

    const openModal = (config = null) => {
        if (config) {
            setEditMode(true);
            setEditConfigId(config._id);
            setConfigForm({
                name: config.name,
                value: config.value,
            });
        } else {
            setEditMode(false);
            setConfigForm({
                name: '',
                value: '',
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowDetailsModal(false);
        setShowConfirmModal(false);
    };

    const openDeleteConfirmModal = (configId) => {
        setDeleteConfigId(configId);
        setShowConfirmModal(true);
    };

    useEffect(() => {
        fetchConfigs();
    }, []);

    return (
        <div className="user-dashboard">
            <Navbar />
            <div className="dashboard-main">
                <Sidebar />
                <div className="dashboard-content">
                    <header className="dashboard-header">
                        <h1 className="dashboard-title" style={{ color: 'black' }}>Configuration Management</h1>
                        <p className="dashboard-description" style={{ color: 'black' }}>Manage all your configurations here.</p>
                    </header>

                    <div className="project-management-section">
                        <div className="project-management-controls">
                            <button className="btn-add-project" onClick={() => openModal()}>
                                Add Configuration
                            </button>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search configurations"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div>{message && <p className="message">{message}</p>}</div>
                        <div className="project-table-wrapper">
                            <table className="project-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Value</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPageConfigs
                                        .filter((config) =>
                                            config.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((config, index) => (
                                            <tr key={config._id}>
                                                <td>{startIndex + index + 1}</td>
                                                <td>{config.name}</td>
                                                <td>{config.value}</td>
                                                <td>
                                                    <button className="view-btn" onClick={() => fetchConfigById(config._id)}>
                                                        Details
                                                    </button>
                                                    <button className="edit-btn" onClick={() => openModal(config)}>
                                                        Edit
                                                    </button>
                                                    <button className="delete-btn" onClick={() => openDeleteConfirmModal(config._id)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pagination" style={{ display: totalItems <= 5? 'none' : '' }}>
                            <button className='pagination-btn'
                                disabled={page === 1}
                                onClick={() => goToPage(page - 1)}
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button 
                                    id='page-btn'
                                    key={i + 1}
                                    className={page === i + 1 ? 'active' : ''}
                                    onClick={() => goToPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button className='pagination-btn'
                                disabled={page === totalPages}
                                onClick={() => goToPage(page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    {showConfirmModal && (
                        <div className="project-modal">
                            <div className="project-modal-content">
                                <h2>Confirm Deletion</h2>
                                <p>Are you sure you want to delete this configuration?</p>
                                <div className="modal-actions">
                                    <button className="delete-confirm-btn" onClick={handleDeleteConfig}>
                                        Confirm
                                    </button>
                                    <button className="cancel-btn" onClick={closeModal}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showModal && (
                        <div className="project-modal">
                            <div className="project-modal-content">
                                <h2>{editMode ? 'Edit Configuration' : 'Add Configuration'}</h2>
                                <input
                                    type="text"
                                    placeholder="Configuration Name"
                                    value={configForm.name}
                                    onChange={(e) =>
                                        setConfigForm({ ...configForm, name: e.target.value })
                                    }
                                />
                                <textarea
                                    placeholder="Configuration Value"
                                    value={configForm.value}
                                    onChange={(e) =>
                                        setConfigForm({ ...configForm, value: e.target.value })
                                    }
                                />
                                <div className="project-modal-actions">
                                    <button className="save-btn" onClick={handleSubmit}>
                                        {editMode ? 'Save Changes' : 'Add Configuration'}
                                    </button>
                                    <button className="cancel-btn" onClick={closeModal}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showDetailsModal && selectedConfig && (
                        <div className="project-modal">
                            <div className="project-modal-content">
                                <h2>Configuration Details</h2>
                                <p><strong>Name:</strong> {selectedConfig.name}</p>
                                <p><strong>Value:</strong> {selectedConfig.value}</p>
                                <button className="cancel-btn" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConfigManagement;