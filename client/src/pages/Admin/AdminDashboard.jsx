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
                        <h1>Dashboard</h1>
                        <p>Welcome to the admin panel. Manage your application efficiently.</p>
                    </header>

                    {/* Overview widgets */}
                    <div className="dashboard-widgets">
                        <div className="widget widget-users">
                            <h3>Users</h3>
                            <p>50 <span>(1.2% ▲)</span></p>
                        </div>
                        <div className="widget widget-projects">
                            <h3>Projects</h3>
                            <p>90 <span>(2.4% ▲)</span></p>
                        </div>
                        <div className="widget widget-new-project">
                            <h3>New Projects</h3>
                            <p>5 <span>(10% ▼)</span></p>
                        </div>
                        <div className="widget widget-new-users">
                            <h3>New Users</h3>
                            <p>4 <span>(5% ▼)</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
