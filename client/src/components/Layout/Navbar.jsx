import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Navbar.css';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="navbar fixed-navbar">
            <div className="navbar-brand">Admin DashBoard</div>
            <div className="navbar-links">
                <Link to="/admin-dashboard">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/" onClick={handleLogout} className="logout-link">Logout</Link>
            </div>
        </nav>
    );
};

export default Navbar;