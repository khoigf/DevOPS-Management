import React from 'react';
import '../../assets/styles/user/UserDashboard.css'; // CSS for Dashboard
import UserNavbar from '../../components/Layout/UserNavbar';
import UserSidebar from '../../components/Layout/UserSidebar';

const Dashboard = () => {

    return (
        <div className="user-dashboard">
          <UserNavbar />
            <div className="dashboard-main">
                <UserSidebar />
                <div className="dashboard-content">
                <header className="dashboard-header">
                    <h1 className="dashboard-title" style={{color:'#000'}}>DevOps Dashboard</h1>
                    <p className="dashboard-description" style={{color:'#000'}}>
                    Manage your CI/CD pipelines, monitor deployments, and track issues effectively.
                    </p>
                </header>
                <div className="dashboard-main" style={{marginLeft:'300px', marginRight:'100px'}}>
                    <section className="dashboard-section">
                    <h2 className="dashboard-subtitle">CI/CD Pipelines</h2>
                    <p>View and manage your continuous integration and deployment pipelines.</p>
                    </section>
                    <section className="dashboard-section">
                    <h2 className="dashboard-subtitle">Deployments</h2>
                    <p>Monitor and manage your application deployments.</p>
                    </section>
                    <section className="dashboard-section">
                    <h2 className="dashboard-subtitle">Issues</h2>
                    <p>Track and resolve issues in your projects.</p>
                    </section>
                </div>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;