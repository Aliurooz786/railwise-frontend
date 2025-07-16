
import React from 'react';
import { Box, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>RailWise</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h4">Welcome to RailWise 🚆</Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Start searching trains and book your journey now!
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/search')}>
            Search Trains
          </Button>
          <Button variant="outlined" onClick={() => navigate('/my-bookings')}>
            My Bookings
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;