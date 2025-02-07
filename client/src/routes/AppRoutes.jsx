import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import UserManagement from '../pages/Admin/UserManagement';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import ProfilePage from '../pages/Profile/Profile';
import UserProfilePage from '../pages/Profile/UserProfile';
import ProtectedRoute from './ProtectedRoute';
import ChangePassword from '../pages/Settings/ChangePassword';
import UserChangePassword from '../pages/Settings/UserChangePass';
import ProjectList from '../pages/Project/ProjectManagement';
import PhaseManagement from '../pages/Phase/PhaseManagement';
import MemberManagement from '../pages/Member/MemberManagement';
import ToolManagement from '../pages/Tools/ToolsManagement';
import ConfigManagement from '../pages/Configurations/ConfigManagement';
import IssueManagement from '../pages/Issues/IssuesManagement';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Dashboard Routes */}
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                
                {/* Admin Routes */}
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
                
                {/* Profile Routes */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/userProfile"
                    element={
                        <ProtectedRoute>
                            <UserProfilePage />
                        </ProtectedRoute>
                    }
                />

                {/* Settings Routes */}
                <Route 
                    path="/settings" 
                    element={
                        <ProtectedRoute>
                            <ChangePassword />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/user/settings" 
                    element={
                        <ProtectedRoute>
                            <UserChangePassword />
                        </ProtectedRoute>
                    } 
                />

                {/* Project Management Routes */}
                <Route 
                    path="/project" 
                    element={
                        <ProtectedRoute>
                            <ProjectList />
                        </ProtectedRoute>
                    } 
                />

                {/* Phase Management Routes */}
                <Route 
                    path="/project/phase" 
                    element={
                        <ProtectedRoute>
                            <PhaseManagement />
                        </ProtectedRoute>
                    }
                />
                
                {/* Member Management Routes */}
                <Route 
                    path="/project/member" 
                    element={
                        <ProtectedRoute>
                            <MemberManagement />
                        </ProtectedRoute>
                    }
                />
                
                {/* Tool Management Routes */}
                <Route
                    path="/project/devops-tool"
                    element={
                        <ProtectedRoute>
                            <ToolManagement />
                        </ProtectedRoute>
                    }
                />
                
                {/* Configuration Management Routes */}
                <Route
                    path="/project/devops-config"
                    element={
                        <ProtectedRoute>
                            <ConfigManagement />
                        </ProtectedRoute>
                    }
                />
                
                {/* Issue Management Routes */}
                <Route
                    path="/project/issue"
                    element={
                        <ProtectedRoute>
                            <IssueManagement />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
