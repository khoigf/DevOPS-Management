import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import '../../assets/styles/AdminDashboard.css'; // Admin Dashboard styles
import { API_BASE_URL } from '../../utils/apiConfig';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    role: '',
    password: '',
  });

  const getAccessToken = () => {
    const tokens = JSON.parse(localStorage.getItem('tokens')); // Token stored as JSON object
    return tokens?.accessToken || '';
  };

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const token = getAccessToken();
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        setMessage(data.error || 'Failed to fetch users');
      }
    } catch (error) {
      setMessage('Error fetching user list.');
    }
  };

  // Add User API
  const handleAddUser = async () => {
    try {
      const token = getAccessToken();
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userForm),
      });
      const data = await response.json();
      if (response.ok) {
        setShowModal(false);
        fetchUsers();
        setMessage('User added successfully.');
      } else {
        setMessage(data.error || 'Failed to add user.');
      }
    } catch (error) {
      setMessage('Error adding user.');
    }
  };

  // Edit User API
  const handleEditUser = async () => {
    try {
      const token = getAccessToken();
      const response = await fetch(`${API_BASE_URL}/admin/users/${editUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userForm),
      });
      const data = await response.json();
      if (response.ok) {
        setShowModal(false);
        fetchUsers();
        setMessage('User updated successfully.');
      } else {
        setMessage(data.error || 'Failed to update user.');
      }
    } catch (error) {
      setMessage('Error updating user.');
    }
  };

  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Delete User API
  const handleDeleteUser = async () => {
    try {
        const token = getAccessToken();
        const response = await fetch(`${API_BASE_URL}/admin/users/${userToDelete._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
        fetchUsers();
        setMessage('User deleted successfully.');
        } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to delete user.');
        }
    } catch (error) {
        setMessage('Error deleting user.');
    } finally {
        setShowDeleteModal(false);
        setUserToDelete(null);
    }
  };

  const handleSubmit = () => {
    if (editMode) {
      handleEditUser();
    } else {
      handleAddUser();
    }
  };

  const openModal = (user = null) => {
    if (user) {
      setEditMode(true);
      setEditUserId(user._id);
      setUserForm({
        username: user.username,
        email: user.email,
        role: user.role,
        password: '', // Password cannot be displayed
      });
    } else {
      setEditMode(false);
      setUserForm({
        username: '',
        email: '',
        role: '',
        password: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Export users to CSV
  const exportToCSV = () => {
    if (users.length === 0) {
      setMessage('No users to export.');
      return;
    }

    const headers = ['ID', 'Username', 'Email', 'Role'];
    const rows = users.map((user) => [
      user._id,
      user.username,
      user.email,
      user.role,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'user_list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-main">
        <Sidebar />
        <div className="dashboard-content">
          <header className="dashboard-header">
            <h1 className="dashboard-title">User Management</h1>
            <p className="dashboard-description">Manage all user accounts here.</p>
          </header>

          <div className="user-management-section">
            <div className="user-management-controls">
              
              <button className="btn-add-user" onClick={() => openModal()}>
                Add User
              </button>
              <button className="export-button" onClick={exportToCSV}>
                Export List
              </button>
              <input
                type="text"
                className="search-input"
                placeholder="Search users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="user-management-controls">{message && <p className="message">{message}</p>}</div>  
            <div className="user-table-wrapper">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((user) =>
                      user.username.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button
                            className="edit-btn"
                            onClick={() => openModal(user)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => confirmDeleteUser(user)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal for Add/Edit User */}
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>{editMode ? 'Edit User' : 'Add User'}</h2>
                <input
                  type="text"
                  placeholder="Username"
                  value={userForm.username}
                  onChange={(e) =>
                    setUserForm({ ...userForm, username: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={userForm.email}
                  onChange={(e) =>
                    setUserForm({ ...userForm, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                />
                {!editMode && (
                  <input
                    type="password"
                    placeholder="Password"
                    value={userForm.password}
                    onChange={(e) =>
                      setUserForm({ ...userForm, password: e.target.value })
                    }
                  />
                )}
                <div className="modal-actions">
                  <button className="save-btn" onClick={handleSubmit}>
                    {editMode ? 'Save Changes' : 'Add User'}
                  </button>
                  <button className="cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {showDeleteModal && (
            <div className="modal">
                <div className="modal-content">
                    <h2>Confirm Deletion</h2>
                    <p>Are you sure you want to delete user "{userToDelete?.username}"?</p>
                    <div className="modal-actions">
                    <button className="delete-confirm-btn" onClick={handleDeleteUser}>
                        Confirm
                    </button>
                    <button
                        className="cancel-btn"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancel
                    </button>
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
