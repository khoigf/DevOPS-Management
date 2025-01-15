import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Layout/UserNavbar';
import Sidebar from '../../components/Layout/UserSidebar';
import '../../assets/styles/user/UserDashboard.css'; // Issues Management styles
import { API_BASE_URL } from '../../utils/apiConfig';

const IssueManagement = () => {
    const [issues, setIssues] = useState([]);
    const [message, setMessage] = useState('');
    const [page, setPage] = useState(1); // Current page
    const [itemsPerPage] = useState(5); // Items per page
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editIssueId, setEditIssueId] = useState(null);
    const [issueForm, setIssueForm] = useState({
        severity: '',
        description: '',
        status: '0', // Default to "Open"
    });
    const [selectedIssue, setSelectedIssue] = useState(null); // For viewing issue details

    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));

    const getAccessToken = () => {
        const tokens = JSON.parse(localStorage.getItem('tokens')); // Token stored as JSON object
        return tokens?.accessToken || '';
    };

        // Filter and paginate configurations
        const filteredConfigs = issues.filter((config) =>
            config.severity.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        const totalItems = filteredConfigs.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const currentPageConfigs = filteredConfigs.slice(startIndex, startIndex + itemsPerPage);
    
        // Handle pagination
        const goToPage = (pageNumber) => {
            setPage(pageNumber);
        };
    

    // Fetch all issues
    const fetchIssues = async () => {
        try {
            const projectId = selectedProject._id;
            const token = getAccessToken();
            if (!projectId) {
                setMessage('Project not found.');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/user/projects/issues/all/${projectId}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setIssues(data);
            } else {
                setMessage(data.error || 'Failed to fetch issues.');
            }
        } catch (error) {
            setMessage('Error fetching issues.');
        }
    };

    // Fetch issue by ID
    const fetchIssueById = async (issueId) => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/issues/${issueId}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setSelectedIssue(data);
                setShowDetailsModal(true);
            } else {
                setMessage(data.error || 'Failed to fetch issue details.');
            }
        } catch (error) {
            setMessage('Error fetching issue details.');
        }
    };

    // Edit Issue API
    const handleEditIssue = async () => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/issues/${editIssueId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(issueForm),
            });
            const data = await response.json();
            if (response.ok) {
                setShowModal(false);
                fetchIssues();
                setMessage('Issue updated successfully.');
            } else {
                setMessage(data.error || 'Failed to update issue.');
            }
        } catch (error) {
            setMessage('Error updating issue.');
        }
    };

    const handleSubmit = () => {
        if (editMode) {
            handleEditIssue();
        }
    };

    const openModal = (issue = null) => {
        if (issue) {
            setEditMode(true);
            setEditIssueId(issue._id);
            setIssueForm({
                severity: issue.severity,
                description: issue.description,
                status: issue.status || '0',
            });
        } else {
            setEditMode(false);
            setIssueForm({
                severity: '',
                description: '',
                status: '0',
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowDetailsModal(false);
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const getStatusText = (status) => {
        switch (status) {
            case '1':
                return 'In Progress';
            case '2':
                return 'Resolved';
            default:
                return 'Open';
        }
    };

    return (
        <div className="user-dashboard">
            <Navbar />
            <div className="dashboard-main">
                <Sidebar />
                <div className="dashboard-content">
                    <header className="dashboard-header">
                        <h1 className="dashboard-severity" style={{color:'black'}}>Issues Management</h1>
                        <p className="dashboard-description" style={{color:'black'}}>Manage all your issues here.</p>
                    </header>

                    <div className="project-management-section">
                        <div className="project-management-controls">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search issues"
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
                                        <th>severity</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPageConfigs
                                        .filter((issue) =>
                                            issue.severity.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((issue, index) => (
                                        <tr key={issue._id}>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{issue.severity}</td>
                                            <td>{issue.description}</td>
                                            <td>{getStatusText(issue.status)}</td>
                                            <td>
                                                <button className="view-btn" onClick={() => fetchIssueById(issue._id)}>
                                                    Details
                                                </button>
                                                <button className="edit-btn" onClick={() => openModal(issue)}>
                                                    Edit
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
                        </div><div className="pagination" style={{ display: totalItems <= 5? 'none' : '' }}>
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
                    {showModal && (
                        <div className="project-modal">
                            <div className="project-modal-content">
                                <h2>{editMode ? 'Edit Issue' : 'Add Issue'}</h2>
                                <input
                                    type="text"
                                    placeholder="Issue severity"
                                    value={issueForm.severity}
                                    disabled={editMode}
                                    onChange={(e) =>
                                        setIssueForm({ ...issueForm, severity: e.target.value })
                                    }
                                />
                                <textarea
                                    placeholder="Issue Description"
                                    value={issueForm.description}
                                    disabled={editMode}
                                    onChange={(e) =>
                                        setIssueForm({ ...issueForm, description: e.target.value })
                                    }
                                />
                                <strong>Status:</strong>
                                <select
                                    className="status-select"
                                    value={issueForm.status}
                                    onChange={(e) => setIssueForm({ ...issueForm, status: e.target.value })}
                                >
                                    <option value="0">Open</option>
                                    <option value="1">In Progress</option>
                                    <option value="2">Resolved</option>
                                </select>
                                <div className="project-modal-actions">
                                    <button className="save-btn" onClick={handleSubmit}>
                                        {editMode ? 'Save Changes' : 'Add Issue'}
                                    </button>
                                    <button className="cancel-btn" onClick={closeModal}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showDetailsModal && selectedIssue && (
                        <div className="project-modal">
                            <div className="project-modal-content">
                                <h2>Issue Details</h2>
                                <p><strong>severity:</strong> {selectedIssue.severity}</p>
                                <p><strong>Description:</strong> {selectedIssue.description}</p>
                                <p><strong>Status:</strong> {getStatusText(selectedIssue.status)}</p>
                                <button className="cancel-btn" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IssueManagement;