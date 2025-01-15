import React from 'react';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import devopsImage from '../../assets/images/devops1.png'; // Image for Admin Dashboard
import LineChart from '../../components/LineChart'; // Path to your custom chart component
import '../../assets/styles/AdminDashboard.css'; // CSS for Admin Dashboard

const AdminDashboard = () => {
  const chartData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Users Using DevOps',
        data: [200, 300, 450, 600, 800, 1000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'DevOps User Growth Over Years',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Users',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
    },
  };

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-main">
        <Sidebar />
        <div className="admin-dashboard-content">
          <header className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Welcome to the admin panel. Manage your application efficiently.</p>
            <img src={devopsImage} alt="DevOps" width="360" height="200" />
          </header>
          {/* Line Chart */}
          <div className="dashboard-chart">
            <LineChart data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
