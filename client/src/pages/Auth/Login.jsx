import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(credentials.email, credentials.password);
    if (response.success) {
        if (response.user.role === 'admin') {
            // Redirect to the admin dashboard
            navigate('/admin-dashboard');
          } else {
            // Redirect to the user dashboard
            navigate('/dashboard');
          }
    } else {
      setError(response.error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={credentials.email}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={credentials.password}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>Register here</Link>
      </Typography>
    </Box>
  );
};

export default Login;
