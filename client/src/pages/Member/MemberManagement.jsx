import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Layout/UserNavbar';
import Sidebar from '../../components/Layout/UserSidebar';
import '../../assets/styles/user/UserDashboard.css'; // Project Management styles
import { API_BASE_URL } from '../../utils/apiConfig';

const MemberManagement = () => {
    const [members, setMembers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState('');
    const [page, setPage] = useState(1); // Current page
    const [itemsPerPage] = useState(5); // Items per page
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTaskTerm, setSearchTaskTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmModalTask, setShowConfirmModalTask] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editMemberId, setEditMemberId] = useState(null);
    const [deleteMemberId, setDeleteMemberId] = useState(null);
    const [deleteTaskId, setDeleteTaskId] = useState(null);
    const [memberForm, setMemberForm] = useState({
        name: '',
        role: '',
    });
    const [selectedMember, setSelectedMember] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showTaskeditModal, setShowTaskeditModal] = useState(false);
    const [editTaskMode, setEditTaskMode] = useState(false);
    const [taskForm, setTaskForm] = useState({
        name: '',
        description: '',
        status: 0,
    });
    const [editTaskId, setEditTaskId] = useState(null);
    const selectedProject = JSON.parse(localStorage.getItem('selectedProject'));

        // Filter and paginate configurations
        const filteredConfigs = members.filter((config) =>
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
    

    const getAccessToken = () => {
        const tokens = JSON.parse(localStorage.getItem('tokens'));
        return tokens?.accessToken || '';
    };

    const fetchMembers = async () => {
        try {
            const projectId = selectedProject._id;
            const token = getAccessToken();
            if (!projectId) {
                setMessage('No project selected.');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/user/projects/members/all/${projectId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setMembers(data);
            } else {
                setMessage('Failed to fetch members.');
            }
        } catch (error) {
            setMessage('Error fetching members.');
        }
    };

    const fetchTasksByMember = async (memberId) => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/tasks/member/${memberId}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setTasks(data);
                setSelectedMember(members.find((m) => m._id === memberId));
                setShowTaskModal(true);
            } else {
                setMessage('Failed to fetch tasks.');
            }
        } catch (error) {
            setMessage('Error fetching tasks.');
        }
    };

    const handleAddTask = async () => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/tasks/${selectedProject._id}/${selectedMember._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(taskForm),
            });

            if (response.ok) {
                setShowTaskeditModal(false);
                fetchTasksByMember(selectedMember._id);
                setMessage('Task added successfully.');
            } else {
                setMessage('Failed to add task.');
            }
        } catch (error) {
            setMessage('Error adding task.');
        }
    };

    const handleEditTask = async () => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/tasks/${editTaskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(taskForm),
            });

            if (response.ok) {
                setShowTaskeditModal(false);
                fetchTasksByMember(selectedMember._id);
                setMessage('Task updated successfully.');
            } else {
                setMessage('Failed to update task.');
            }
        } catch (error) {
            setMessage('Error updating task.');
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/tasks/${deleteTaskId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                fetchTasksByMember(selectedMember._id);
                setMessage('Task deleted successfully.');
            } else {
                setMessage('Failed to delete task.');
            }
        } catch (error) {
            setMessage('Error deleting task.');
        }
        setShowConfirmModalTask(false);
    };

    const openTaskModal = ( task = null) => {

        if (task) {
            setEditTaskMode(true);
            setEditTaskId(task._id);
            setTaskForm({
                name: task.name,
                description: task.description,
                status: task.status,
            });
        } else {
            setEditTaskMode(false);
            setTaskForm({
                name: '',
                description: '',
                status: 0,
            });
        }
        setShowTaskeditModal(true);
    }

    const closeTaskModal = () => {
        setShowTaskModal(false);
    };

    const handleAddMember = async () => {
        try {
            const projectId = selectedProject._id;
            const token = getAccessToken();
            if (!projectId) {
                setMessage('No project selected.');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/user/projects/members/${projectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(memberForm),
            });

            if (response.ok) {
                setShowModal(false);
                fetchMembers();
                setMessage('Member added successfully.');
            } else {
                setMessage('Failed to add member.');
            }
        } catch (error) {
            setMessage('Error adding member.');
        }
    };

    const handleEditMember = async () => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/members/${editMemberId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(memberForm),
            });

            if (response.ok) {
                setShowModal(false);
                fetchMembers();
                setMessage('Member updated successfully.');
            } else {
                setMessage('Failed to update member.');
            }
        } catch (error) {
            setMessage('Error updating member.');
        }
    };

    const handleDeleteMember = async () => {
        try {
            const token = getAccessToken();
            const response = await fetch(`${API_BASE_URL}/user/projects/members/${deleteMemberId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                fetchMembers();
                setMessage('Member deleted successfully.');
            } else {
                setMessage('Failed to delete member.');
            }
        } catch (error) {
            setMessage('Error deleting member.');
        }
        setShowConfirmModal(false);
    };

    const handleSubmit = () => {
        if (editMode) {
            handleEditMember();
        } else {
            handleAddMember();
        }
    };

    const handleSubmitTask = () => {
        if (editTaskMode) {
            handleEditTask();
        } else {
            handleAddTask();
        }
    };

    const openModal = (member = null) => {
        if (member) {
            setEditMode(true);
            setEditMemberId(member._id);
            setMemberForm({
                name: member.name,
                role: member.role,
            });
        } else {
            setEditMode(false);
            setMemberForm({
                name: '',
                role: '',
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setShowDetailsModal(false);
        setShowConfirmModal(false);
        setShowTaskeditModal(false);
        setShowConfirmModalTask(false);
    };

    const openDeleteConfirmModal = (memberId) => {
        setDeleteMemberId(memberId);
        setShowConfirmModal(true);
    };

    const openDeleteConfirmModalTask = (taskId) => {
        setDeleteTaskId(taskId);
        setShowConfirmModalTask(true);
    };

    const getStatusText = (status) => {
        switch (status) {
            case '1':
                return 'In Process';
            case '2':
                return 'Done';
            default:
                return 'Pending';
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <div className="user-dashboard">
            <Navbar />
            <div className="dashboard-main">
                <Sidebar />
                <div className="dashboard-content">
                    <header className="dashboard-header">
                        <h1 className="dashboard-title" style={{ color: 'black' }}>Member Management</h1>
                        <p className="dashboard-description" style={{ color: 'black' }}>Manage all your members here.</p>
                    </header>

                    <div className="project-management-section">
                        <div className="project-management-controls">
                            <button className="btn-add-project" onClick={() => openModal()}>
                                Add Member
                            </button>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search members"
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
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPageConfigs
                                        .filter((member) =>
                                            member.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((member, index) => (
                                            <tr key={member._id}>
                                                <td>{startIndex + index + 1}</td>
                                                <td>{member.name}</td>
                                                <td>{member.role}</td>
                                                <td>
                                                    <button className="view-btn" onClick={() => fetchTasksByMember(member._id)}>Tasks</button>
                                                    <button className="edit-btn" onClick={() => openModal(member)}>
                                                        Edit
                                                    </button>
                                                    <button className="delete-btn" onClick={() => openDeleteConfirmModal(member._id)}>
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
                                <p>Are you sure you want to delete this member?</p>
                                <div className="modal-actions">
                                    <button className="delete-confirm-btn" onClick={handleDeleteMember}>
                                        Confirm
                                    </button>
                                    <button className="cancel-btn" onClick={closeModal}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showTaskModal && selectedMember && (
                        <div className="task-modal">
                            <div className="task-modal-content">
                                <h2>Tasks for {selectedMember.name}</h2>
                                <button className="btn-add-task" onClick={() => openTaskModal()}>
                                    Add Task
                                </button>
                                <div>{message && <p className="message">{message}</p>}</div>
                                <input
                                    type="text"
                                    className="search-task-input"
                                    placeholder="Search tasks"
                                    value={searchTaskTerm}
                                    onChange={(e) => setSearchTaskTerm(e.target.value)}
                                />
                                <div className="task-table-wrapper">
                                    <table className="task-table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Task Name</th>
                                                <th>Description</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks
                                                .filter((task) =>   
                                                    task.name.toLowerCase().includes(searchTaskTerm.toLowerCase())
                                                )
                                                .map((task, index) => (
                                                <tr key={task._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{task.name}</td>
                                                    <td>{task.description}</td>
                                                    <td>{getStatusText(task.status)}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="edit-btn"
                                                            onClick={() => openTaskModal(task)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="delete-btn"
                                                            onClick={() => openDeleteConfirmModalTask(task._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <button className="cancel-btn" onClick={closeTaskModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                    {showTaskeditModal && (
                        <div className="project-modal">
                        <div className="project-modal-content">
                            <h2>{editTaskMode ? 'Edit Task' : 'Add Task'}</h2>
                            <input
                                type="text"
                                placeholder="Task Name"
                                value={taskForm.name}
                                onChange={(e) => setTaskForm({ ...taskForm, name: e.target.value })}
                            />
                            <textarea
                                placeholder="Task Description"
                                value={taskForm.description}
                                onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                            ></textarea>
                            <strong>Status:</strong>
                            <select
                                className="status-select"
                                value={taskForm.status}
                                onChange={(e) => setTaskForm({ ...taskForm, status: Number(e.target.value) })}
                            >
                                <option value={0}>Pending</option>
                                <option value={1}>In Process</option>
                                <option value={2}>Done</option>
                            </select>
                            <div className="project-modal-actions">
                            <button className="save-btn" onClick={handleSubmitTask}>{editTaskMode ? 'Save Changes' : 'Add Task'}</button>
                            <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                            </div>
                            </div>
                        </div>
                    )}
                    {showConfirmModalTask && (
                        <div className="project-modal">
                            <div className="project-modal-content">
                                <h2>Confirm Deletion</h2>
                                <p>Are you sure you want to delete this task?</p>   
                                <div className="modal-actions">
                                    <button className="delete-confirm-btn" onClick={() => handleDeleteTask(deleteTaskId)}>
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
                                <h2>{editMode ? 'Edit Member' : 'Add Member'}</h2>
                                <input
                                    type="text"
                                    placeholder="Member Name"
                                    value={memberForm.name}
                                    disabled={editMode}
                                    onChange={(e) =>
                                        setMemberForm({ ...memberForm, name: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Role"
                                    value={memberForm.role}
                                    onChange={(e) =>
                                        setMemberForm({ ...memberForm, role: e.target.value })
                                    }
                                />
                                <div className="project-modal-actions">
                                    <button className="save-btn" onClick={handleSubmit}>
                                        {editMode ? 'Save Changes' : 'Add Member'}
                                    </button>
                                    <button className="cancel-btn" onClick={closeModal}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showDetailsModal && selectedMember && (
                        <div className="project-modal">
                            <div className="project-modal-content">
                                <h2>Member Details</h2>
                                <p><strong>Name:</strong> {selectedMember.name}</p>
                                <p><strong>Role:</strong> {selectedMember.role}</p>
                                <button className="cancel-btn" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemberManagement;