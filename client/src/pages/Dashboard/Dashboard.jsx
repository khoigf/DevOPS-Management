import React from 'react';
import '../../assets/styles/dashboard.css'; // CSS for Dashboard
import UserNavbar from '../../components/Layout/UserNavbar';
import UserSidebar from '../../components/Layout/UserSidebar';

const Dashboard = () => {

    return (
        <div className="user-dash">
          <UserNavbar />
          <div className="dash-main">
            <UserSidebar />
            <div className="dash-content">
            <header className="dash-header">
                <h1>DevOps Dash</h1>
                <p>Manage your CI/CD pipelines, monitor deployments, and track issues effectively.</p>
            </header>
            <main className="dash-content">
                <section className="pipelines-section">
                    <h2>CI/CD Pipelines</h2>
                    <p>View and manage your continuous integration and deployment pipelines.</p>
                    {/* Add pipeline management components here */}
                </section>
                <section className="deployments-section">
                    <h2>Deployments</h2>
                    <p>Monitor and manage your application deployments.</p>
                    {/* Add deployment monitoring components here */}
                </section>
                <section className="issues-section">
                    <h2>Issues</h2>
                    <p>Track and resolve issues in your projects.</p>
                    {/* Add issue tracking components here */}
                </section>
            </main>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;