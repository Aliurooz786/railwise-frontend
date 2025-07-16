
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', passWord: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error(await response.text());

      const result = await response.text();
      setSuccess(result);
      setForm({ firstName: '', lastName: '', email: '', passWord: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ width: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" align="center">Register</Typography>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField label="First Name" name="firstName" fullWidth required margin="normal" value={form.firstName} onChange={handleChange} />
        <TextField label="Last Name" name="lastName" fullWidth required margin="normal" value={form.lastName} onChange={handleChange} />
        <TextField label="Email" name="email" type="email" fullWidth required margin="normal" value={form.email} onChange={handleChange} />
        <TextField label="Password" name="passWord" type="password" fullWidth required margin="normal" value={form.passWord} onChange={handleChange} />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Register</Button>
      </Box>

      <Typography align="center" sx={{ mt: 2 }}>
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Box>
  );
};

export default RegisterPage;