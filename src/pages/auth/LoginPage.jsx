import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
    
      setSuccess('Login successful!');
      window.location.href = '/home';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ width: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" align="center">Login to RailWise</Typography>
      
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField label="Email" fullWidth required margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth required margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
      </Box>

      <Divider sx={{ my: 2 }}>OR</Divider>

      <Button variant="outlined" fullWidth disabled>Sign in with Google (Coming soon)</Button>

      <Typography align="center" sx={{ mt: 2 }}>
        Don't have an account? <Link to="/register">Register</Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;