import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Register = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '', role: 'user' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        setSuccess(false);

        if (!user.username || !user.email || !user.password) {
            setError('All fields are required.');
            return;
        }

        const result = await register(user);

        if (result.success) {
            setSuccess(true);
            setTimeout(() => navigate('/'), 2000); // Redirect after success
        } else {
            setError(result.error || 'Registration failed. Please try again.');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>Registration successful! Redirecting to login...</Alert>}
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    name="username"
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={user.username}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={user.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Register
                </Button>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Have account: {' '}
                    <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>Go to Login</Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Register;
