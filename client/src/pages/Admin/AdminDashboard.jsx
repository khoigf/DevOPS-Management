import React from 'react';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import '../../assets/styles/AdminDashboard.css'; // CSS for Admin Dashboard

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <Navbar />
            <div className="dashboard-main">
                <Sidebar />
                <div className="dashboard-content">
                    <header className="dashboard-header">
                        <h1>Admin Dashboard</h1>
                        <p>Welcome to the admin panel. Manage your application efficiently.</p>
                    </header>

                    {/* Overview widgets */}
                    <div className="dashboard-widgets">
                        <div className="widget">
                            <h3>Total Users</h3>
                            <p>150</p>
                        </div>
                        <div className="widget">
                            <h3>Active Users</h3>
                            <p>20</p>
                        </div>
                    </div>
                    <div className="dashboard-widgets">
                        <div className="widget">
                            <h3>Total Projects</h3>
                            <p>25</p>
                        </div>
                        <div className="widget">
                            <h3>Active Projects</h3>
                            <p>5</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
