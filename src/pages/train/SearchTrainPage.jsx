import React, { useState } from 'react';
import {
  Box, TextField, Button, Grid, Typography, Alert
} from '@mui/material';
import TrainResults from '../../components/TrainResults';


const SearchTrainPage = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [journeyDate, setJourneyDate] = useState('');

  const [trains, setTrains] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setTrains([]);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        `http://localhost:8080/trains/search?from=${source.toUpperCase()}&to=${destination.toUpperCase()}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Train search failed');
      }

      const data = await response.json();
      setTrains(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Search Trains</Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Source Station"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Destination Station"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Journey Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={journeyDate}
            onChange={(e) => setJourneyDate(e.target.value)}
            fullWidth
            required
          />
        </Grid>
      </Grid>

      <Button variant="contained" onClick={handleSearch}>Search</Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {trains.length === 0 && !error && (
        <Typography sx={{ mt: 2 }}>No trains available for this route.</Typography>
      )}

      {trains.length > 0 && (
        <TrainResults trains={trains} />
      )}
    </Box>
  );
};

export default SearchTrainPage;