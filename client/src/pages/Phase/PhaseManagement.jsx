import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Layout/UserNavbar';
import Sidebar from '../../components/Layout/UserSidebar';
import '../../assets/styles/user/UserDashboard.css'; // Project Management styles
import { API_BASE_URL } from '../../utils/apiConfig';

const PhaseManagement = () => {
    const [phases, setPhases] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editPhaseId, setEditPhaseId] = useState(null);
    const [deletePhaseId, setDeletePhaseId] = useState(null);
    const [phaseForm, setPhaseForm] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        status: '0', // Default to "In Process"
    });
    const [selectedPhase, setSelectedPhase] = useState(null); // For viewing phase details
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));
    const getAccessToken = () => {
        const tokens = JSON.parse(localStorage.getItem('tokens'));
        return tokens?.accessToken || '';
    };

    const fetchPhases = async () => {
        try {
            const projectId = selectedProject._id;
            const token = getAccessToken();
            if (!projectId) {
                setMessage('Project not found.');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/user/projects/phases/all/${projectId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPhases(data);
            } else {
                setMessage('Error fetching phases.');
            }
        } catch (error) {
            setMessage('Error fetching phases.');
        }
    };

    const fetchPhaseById = async (phaseId) => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/phases/${phaseId}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setSelectedPhase(data);
                setShowDetailsModal(true);
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('Error fetching phase details.');
        }
    };

    const handleAddPhase = async () => {
        try {
            const projectId = selectedProject._id;
            const token = getAccessToken();
            if (!projectId) {
                setMessage('Project not found.');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/user/projects/phases/${projectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(phaseForm),
            });

            if (response.ok) {
                setShowModal(false);
                setMessage('Phase added successfully.');
                fetchPhases(); // Refresh the list of phases
            } else {
                setMessage('Error adding phase.');
            }
        } catch (error) {
            setMessage('Error adding phase.');
        }
    };

    const handleEditPhase = async () => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/phases/${editPhaseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(phaseForm),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Phase updated successfully.');
                fetchPhases();
                closeModal();
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('Error updating phase.');
        }
    };

    const handleDeletePhase = async () => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/phases/${deletePhaseId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Phase deleted successfully.');
                fetchPhases();
                closeModal();
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('Error deleting phase.');
        }
        setShowConfirmModal(false);
    };

    const handleSubmit = () => {
        if (editMode) {
            handleEditPhase();
        } else {
            handleAddPhase();
        }
    };

    const openModal = (phase = null) => {
        if (phase) {
            setEditMode(true);
            setEditPhaseId(phase._id);
            setPhaseForm({
                name: phase.name,
                description: phase.description,
                start_date: phase.start_date,
                end_date: phase.end_date,
                status: phase.status,
            });
        } else {
            setEditMode(false);
            setPhaseForm({
                name: '',
                description: '',
                start_date: '',
                end_date: '',
                status: '0',
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowDetailsModal(false);
        setShowConfirmModal(false);
    };

    const openDeleteConfirmModal = (phaseId) => {
        setDeletePhaseId(phaseId);
        setShowConfirmModal(true);
    };

    useEffect(() => {
        fetchPhases();
    }, []);

    const getStatusText = (status) => {
        switch (status) {
            case '0':
                return 'In Process';
            case '1':
                return 'Completed';
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
                        <h1 className="dashboard-title" style={{ color: 'black' }}>Phase Management</h1>
                        <p className="dashboard-description" style={{ color: 'black' }}>Manage all your phases here.</p>
                    </header>

                    <div className="project-management-section">
                        <div className="project-management-controls">
                            <button className="btn-add-project" onClick={() => openModal()}>
                                Add Phase
                            </button>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search phases"
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
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {phases
                                        .filter((phase) =>
                                            phase.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((phase, index) => (
                                            <tr key={phase._id}>
                                                <td>{index + 1}</td>
                                                <td>{phase.name}</td>
                                                <td>{phase.start_date}</td>
                                                <td>{phase.end_date}</td>
                                                <td>{getStatusText(phase.status)}</td>
                                                <td>
                                                    <button className="view-btn" onClick={() => fetchPhaseById(phase._id)}>
                                                        Details
                                                    </button>
                                                    <button className="edit-btn" onClick={() => openModal(phase)}>
                                                        Edit
                                                    </button>
                                                    <button className="delete-btn" onClick={() => openDeleteConfirmModal(phase._id)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {showConfirmModal && (
                        <div className="project-modal">
                            <div className="project-modal-content">
                                <h2>Confirm Deletion</h2>
                                <p>Are you sure you want to delete this phase?</p>
                                <div className="modal-actions">
                                    <button className="delete-confirm-btn" onClick={handleDeletePhase}>
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
                                <h2>{editMode ? 'Edit Phase' : 'Add Phase'}</h2>
                                <input
                                    type="text"
                                    placeholder="Phase Name"
                                    value={phaseForm.name}
                                    onChange={(e) =>
                                        setPhaseForm({ ...phaseForm, name: e.target.value })
                                    }
                                />
                                <textarea
                                    placeholder="Phase Description"
                                    value={phaseForm.description}
                                    onChange={(e) =>
                                        setPhaseForm({ ...phaseForm, description: e.target.value })
                                    }
                                />
                                <h4>Start Date - End Date</h4>
                                <input
                                    type="date"
                                    value={phaseForm.start_date}
                                    onChange={(e) =>
                                        setPhaseForm({ ...phaseForm, start_date: e.target.value })
                                    }
                                />
                                <input
                                    type="date"
                                    value={phaseForm.end_date}
                                    onChange={(e) =>
                                        setPhaseForm({ ...phaseForm, end_date: e.target.value })
                                    }
                                />
                                <strong>Status:</strong>
                                <select
                                    className="status-select"
                                    value={phaseForm.status}
                                    onChange={(e) => setPhaseForm({ ...phaseForm, status: e.target.value })}
                                >
                                    <option value="0">In Process</option>
                                    <option value="1">Completed</option>
                                </select>
                                <div className="project-modal-actions">
                                    <button className="save-btn" onClick={handleSubmit}>
                                        {editMode ? 'Save Changes' : 'Add Phase'}
                                    </button>
                                    <button className="cancel-btn" onClick={closeModal}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showDetailsModal && selectedPhase && (
                        <div className="project-modal">
                            <div className="project-modal-content">
                                <h2>Phase Details</h2>
                                <p><strong>Name:</strong> {selectedPhase.name}</p>
                                <p><strong>Description:</strong> {selectedPhase.description}</p>
                                <p><strong>Start Date:</strong> {selectedPhase.start_date}</p>
                                <p><strong>End Date:</strong> {selectedPhase.end_date}</p>
                                <p><strong>Status:</strong> {getStatusText(selectedPhase.status)}</p>
                                <button className="cancel-btn" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhaseManagement;