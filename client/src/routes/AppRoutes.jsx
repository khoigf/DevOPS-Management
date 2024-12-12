import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import UserManagement from '../pages/Admin/UserManagement';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-dashboard/users"
                    element={
                        <ProtectedRoute role="admin">
                            <UserManagement />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
