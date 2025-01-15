import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Layout/UserNavbar';
import Sidebar from '../../components/Layout/UserSidebar';
import '../../assets/styles/user/UserDashboard.css'; // Project Management styles
import { API_BASE_URL } from '../../utils/apiConfig';

const ToolManagement = () => {
    const [tools, setTools] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1); // Current page
    const [itemsPerPage] = useState(5); // Items per page
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editToolId, setEditToolId] = useState(null);
    const [deleteToolId, setDeleteToolId] = useState(null);
    const [toolForm, setToolForm] = useState({
        name: '',
        type: '',
        status: '1', // Default to "Active"
    });
    const [selectedTool, setSelectedTool] = useState(null); // For viewing tool details
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const getAccessToken = () => {
        const tokens = JSON.parse(localStorage.getItem('tokens'));
        return tokens?.accessToken || '';
    };

    const fetchTools = async () => {
        try {
            const projectId = selectedProject._id;
            const token = getAccessToken();
            if (!projectId) {
                setMessage('Project not found.');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/user/projects/tools/all/${projectId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTools(data);
            } else {
                setMessage('Error fetching tools.');
            }
        } catch (error) {
            setMessage('Error fetching tools.');
        }
    };

    const fetchToolById = async (toolId) => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/tools/${toolId}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setSelectedTool(data);
                setShowDetailsModal(true);
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('Error fetching tool details.');
        }
    };
    // Filter and paginate configurations
    const filteredConfigs = tools.filter((config) =>
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


    const handleAddTool = async () => {
        try {
            const projectId = selectedProject._id;
            const token = getAccessToken();
            if (!projectId) {
                setMessage('Project not found.');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/user/projects/tools/${projectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(toolForm),
            });

            if (response.ok) {
                setMessage('Tool added successfully.');
                fetchTools(); // Refresh the list of tools
                closeModal();
            } else {
                setMessage('Error adding tool.');
            }
        } catch (error) {
            setMessage('Error adding tool.');
        }
    };

    const handleEditTool = async () => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/tools/${editToolId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(toolForm),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Tool updated successfully.');
                fetchTools();
                closeModal();
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('Error updating tool.');
        }
    };

    const handleDeleteTool = async () => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/tools/${deleteToolId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Tool deleted successfully.');
                fetchTools();
                closeModal();
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('Error deleting tool.');
        }
        setShowConfirmModal(false);
    };

    const handleSubmit = () => {
        if (editMode) {
            handleEditTool();
        } else {
            handleAddTool();
        }
    };

    const openModal = (tool = null) => {
        if (tool) {
            setEditMode(true);
            setEditToolId(tool._id);
            setToolForm({
                name: tool.name,
                type: tool.type,
                status: tool.status,
            });
        } else {
            setEditMode(false);
            setToolForm({
                name: '',
                type: '',
                status: '1',
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowDetailsModal(false);
        setShowConfirmModal(false);
    };

    const openDeleteConfirmModal = (toolId) => {
        setDeleteToolId(toolId);
        setShowConfirmModal(true);
    };

    useEffect(() => {
        fetchTools();
    }, []);

    const getStatusText = (status) => {
        switch (status) {
            case '1':
                return 'Active';
            case '0':
                return 'Inactive';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className="user-dashboard">
            <Navbar />
            <div className="dashboard-main">
                <Sidebar />
                <div className="dashboard-content">
                    <header className="dashboard-header">
                        <h1 className="dashboard-title" style={{ color: 'black' }}>Tool Management</h1>
                        <p className="dashboard-description" style={{ color: 'black' }}>Manage all your tools here.</p>
                    </header>

                    <div className="project-management-section">
                        <div className="project-management-controls">
                            <button className="btn-add-project" onClick={() => openModal()}>
                                Add Tool
                            </button>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search tools"
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
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPageConfigs
                                        .filter((tool) =>
                                            tool.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((tool, index) => (
                                            <tr key={tool._id}>
                                                <td>{startIndex + index + 1}</td>
                                                <td>{tool.name}</td>
                                                <td>{tool.type}</td>
                                                <td>{getStatusText(tool.status)}</td>
                                                <td>
                                                    <button className="view-btn" onClick={() => fetchToolById(tool._id)}>
                                                        Details
                                                    </button>
                                                    <button className="edit-btn" onClick={() => openModal(tool)}>
                                                        Edit
                                                    </button>
                                                    <button className="delete-btn" onClick={() => openDeleteConfirmModal(tool._id)}>
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
                                <p>Are you sure you want to delete this tool?</p>
                                <div className="modal-actions">
                                    <button className="delete-confirm-btn" onClick={handleDeleteTool}>
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
                                <h2>{editMode ? 'Edit Tool' : 'Add Tool'}</h2>
                                <input
                                    type="text"
                                    placeholder="Tool Name"
                                    value={toolForm.name}
                                    onChange={(e) =>
                                        setToolForm({ ...toolForm, name: e.target.value })
                                    }
                                />
                                <textarea
                                    placeholder="Tool Type"
                                    value={toolForm.type}
                                    onChange={(e) =>
                                        setToolForm({ ...toolForm, type: e.target.value })
                                    }
                                />
                                <strong>Status:</strong>
                                <select
                                    className="status-select"
                                    value={toolForm.status}
                                    onChange={(e) => setToolForm({ ...toolForm, status: e.target.value })}
                                >
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                                <div className="project-modal-actions">
                                    <button className="save-btn" onClick={handleSubmit}>
                                        {editMode ? 'Save Changes' : 'Add Tool'}
                                    </button>
                                    <button className="cancel-btn" onClick={closeModal}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showDetailsModal && selectedTool && (
                        <div className="project-modal">
                            <div className="project-modal-content">
                                <h2>Tool Details</h2>
                                <p><strong>Name:</strong> {selectedTool.name}</p>
                                <p><strong>Type:</strong> {selectedTool.type}</p>
                                <p><strong>Status:</strong> {getStatusText(selectedTool.status)}</p>
                                <button className="cancel-btn" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ToolManagement;