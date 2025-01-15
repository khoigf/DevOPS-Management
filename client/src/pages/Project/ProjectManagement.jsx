import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Layout/UserNavbar';
import Sidebar from '../../components/Layout/UserSidebar';
import '../../assets/styles/user/UserDashboard.css'; // Project Management styles
import { API_BASE_URL } from '../../utils/apiConfig';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    owner: '',
    repo: '',
    start_date: '',
    end_date: '',
    current_status: '0', // Default to "Not Start"
  });
  const [selectedProject, setSelectedProject] = useState(null); // For viewing project details
  const navigate = useNavigate();
  // Get userId and token from localStorage
  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Save userId in localStorage on login
    return user?.userId || null;
  };

  const getAccessToken = () => {
    const tokens = JSON.parse(localStorage.getItem('tokens')); // Token stored as JSON object
    return tokens?.accessToken || '';
  };

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const userId = getUserId();
      const token = getAccessToken();
      if (!userId) {
        setMessage('User not authenticated.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/user/projects/all/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setProjects(data);
      } else {
        setMessage(data.error || 'Failed to fetch projects.');
      }
    } catch (error) {
      setMessage('Error fetching projects.');
    }
  };

  // Fetch project by ID
  const fetchProjectById = async (projectId) => {
    try {
      const token = getAccessToken();
      const response = await fetch(`${API_BASE_URL}/user/projects/${projectId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setSelectedProject(data);
        setShowDetailsModal(true);
      } else {
        setMessage(data.error || 'Failed to fetch project details.');
      }
    } catch (error) {
      setMessage('Error fetching project details.');
    }
  };

  // Add Project API
  const handleAddProject = async () => {
    try {
      const userId = getUserId();
      const token = getAccessToken();
      if (!userId) {
        setMessage('User not authenticated.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/user/projects/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` },
        body: JSON.stringify(projectForm),
      });
      const data = await response.json();
      if (response.ok) {
        setShowModal(false);
        fetchProjects();
        setMessage('Project added successfully.');
      } else {
        setMessage(data.error || 'Failed to add project.');
      }
    } catch (error) {
      setMessage('Error adding project.');
    }
  };

  // Edit Project API
  const handleEditProject = async () => {
    try {
      const token = getAccessToken();
      const response = await fetch(`${API_BASE_URL}/user/projects/${editProjectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectForm),
      });
      const data = await response.json();
      if (response.ok) {
        setShowModal(false);
        fetchProjects();
        setMessage('Project updated successfully.');
      } else {
        setMessage(data.error || 'Failed to update project.');
      }
    } catch (error) {
      setMessage('Error updating project.');
    }
  };

  // Delete Project API
  const handleDeleteProject = async () => {
    try {
      const token = getAccessToken();
      const response = await fetch(`${API_BASE_URL}/user/projects/${deleteProjectId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        fetchProjects();
        setMessage('Project deleted successfully.');
      } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to delete project.');
      }
    } catch (error) {
      setMessage('Error deleting project.');
    }
    setShowConfirmModal(false);
  };

  const handleSubmit = () => {
    if (editMode) {
      handleEditProject();
    } else {
      handleAddProject();
    }
  };

  const openModal = (project = null) => {
    if (project) {
      setEditMode(true);
      setEditProjectId(project._id);
      setProjectForm({
        name: project.name,
        description: project.description,
        owner: project.owner,
        repo: project.repo,
        start_date: project.start_date,
        end_date: project.end_date,
        current_status: project.current_status || '0',
      });
    } else {
      setEditMode(false);
      setProjectForm({
        name: '',
        description: '',
        owner: '',
        repo: '',
        start_date: '',
        end_date: '',
        current_status: '0',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowDetailsModal(false);
    setShowConfirmModal(false);
  };

  const openDeleteConfirmModal = (projectId) => {
    setDeleteProjectId(projectId);
    setShowConfirmModal(true);
  };

  const handleProjectDetailNavigation = (path, project) => {
    setSelectedProject(project);
    localStorage.setItem('selectedProject', JSON.stringify(project));
    navigate('/project' + path);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const getStatusText = (status) => {
    switch (status) {
      case '1':
        return 'Active';
      case '2':
        return 'Done';
      default:
        return 'Not Start';
    }
  };

  return (
    <div className="user-dashboard">
      <Navbar />
      <div className="dashboard-main">
        <Sidebar />
        <div className="dashboard-content">
          <header className="dashboard-header">
            <h1 className="dashboard-title" style={{color:'black'}}>Project Management</h1>
            <p className="dashboard-description" style={{color:'black'}}>Manage all your projects here.</p>
          </header>

          <div className="project-management-section">
            <div className="project-management-controls">
              <button className="btn-add-project" onClick={() => openModal()}>
                Add Project
              </button>
              <input
                type="text"
                className="search-input"
                placeholder="Search projects"
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
                  {projects
                    .filter((project) =>
                      project.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((project, index) => (
                    <tr key={project._id}>
                      <td>{index + 1}</td>
                      <td>{project.name}</td>
                      <td>{project.start_date}</td>
                      <td>{project.end_date}</td>
                      <td>{getStatusText(project.current_status)}</td>
                      <td>
                        <button className="view-btn" onClick={() => fetchProjectById(project._id)}>
                          Details
                        </button>
                        <button className="edit-btn" onClick={() => openModal(project)}>
                          Edit
                        </button>
                        <button className="delete-btn" onClick={() => openDeleteConfirmModal(project._id)}>
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
                <p>Are you sure you want to delete this project?</p>
                <div className="modal-actions">
                  <button className="delete-confirm-btn" onClick={handleDeleteProject}>
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
                <h2>{editMode ? 'Edit Project' : 'Add Project'}</h2>
                <input
                  type="text"
                  placeholder="Project Name"
                  value={projectForm.name}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, name: e.target.value })
                  }
                />
                <textarea
                  placeholder="Project Description"
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, description: e.target.value })
                  }
                />
                <textarea
                  placeholder="GitHub Owner"
                  value={projectForm.owner}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, owner: e.target.value })
                  }
                />
                <textarea
                  placeholder="Name GitHub Repository"
                  value={projectForm.repo}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, repo: e.target.value })
                  }
                />
                <h4>Start Date - End Date</h4>
                <input
                  type="date"
                  value={projectForm.start_date}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, start_date: e.target.value })
                  }
                />
                <input
                  type="date"
                  value={projectForm.end_date}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, end_date: e.target.value })
                  }
                />
                <strong>Status:</strong>
                <select
                  className="status-select"
                  value={projectForm.current_status}
                  onChange={(e) => setProjectForm({ ...projectForm, current_status: e.target.value })}
                >
                  <option value="0">Not Start</option>
                  <option value="1">In Process</option>
                  <option value="2">Done</option>
                </select>
                <div className="project-modal-actions">
                  <button className="save-btn" onClick={handleSubmit}>
                    {editMode ? 'Save Changes' : 'Add Project'}
                  </button>
                  <button className="cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {showDetailsModal && selectedProject && (
            <div className="project-modal">
              <div className="project-modal-content">
                <h2>Project Details</h2>
                <p><strong>Name:</strong> {selectedProject.name}</p>
                <p><strong>Description:</strong> {selectedProject.description}</p>
                <p><strong>GitHub Owner:</strong> {selectedProject.owner}</p>
                <p><strong>GitHub Repo:</strong> {selectedProject.repo}</p>
                <p><strong>Start Date:</strong> {selectedProject.start_date}</p>
                <p><strong>End Date:</strong> {selectedProject.end_date}</p>
                <p><strong>Status:</strong> {getStatusText(selectedProject.current_status)}</p>
                <div className="project-detail-actions">
                  <button className="view-btn" onClick={() => handleProjectDetailNavigation('/phase', selectedProject)}>View Phases</button>
                  <button className="view-btn" onClick={() => handleProjectDetailNavigation('/member', selectedProject)}>View Members</button>
                  <button className="view-btn" onClick={() => handleProjectDetailNavigation('/devops-tool', selectedProject)}>View Tools</button>
                  <button className="view-btn" onClick={() => handleProjectDetailNavigation('/devops-config', selectedProject)}>View Configs</button>
                  <button className="view-btn" onClick={() => handleProjectDetailNavigation('/issue', selectedProject)}>View Issues</button>
                </div>
                <button className="cancel-btn" onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
