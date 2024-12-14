import React from 'react';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import '../../assets/styles/AdminDashboard.css'; // CSS for Admin Dashboard

const UserManagement = () => {
    return (
        <div className="admin-dashboard">
            <Navbar />
            <div className="dashboard-main">
                <Sidebar />
                <div className="dashboard-content">
                    <header className="dashboard-header">
                        <h1>User Management</h1>
                        <p>Manage all user accounts here.</p>
                    </header>

                    <div className="user-table-section">
                        <div className="table-header">
                            <button className="export-button">Export List</button>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search users"
                            />
                        </div>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Created Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>John Doe</td>
                                        <td>john.doe@example.com</td>
                                        <td>Admin</td>
                                        <td>2023-01-01</td>
                                        <td>Active</td>
                                        <td>
                                            <button className="edit-btn">Edit</button>
                                            <button className="delete-btn">Delete</button>
                                        </td>
                                    </tr>
                                    {/* Add more rows */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
