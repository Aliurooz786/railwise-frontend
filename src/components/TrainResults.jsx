import React from 'react';
import { Card, CardContent, Typography, Grid, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TrainResults = ({ trains }) => {
  const navigate = useNavigate();

  if (!trains || trains.length === 0) {
    return <Typography>No trains found</Typography>;
  }

  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      {trains.map((train, index) => (
        <Grid item xs={12} md={6} key={`${train.trainNumber}-${index}`}>
          <Card>
            <CardContent>
              <Typography variant="h6">{train.trainName} ({train.trainNumber})</Typography>
              <Typography>{train.fromStation} → {train.toStation}</Typography>
              <Typography>Departure: {train.departureTime}, Arrival: {train.arrivalTime}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2">Classes:</Typography>
              {train.classes?.map((cls, idx) => (
                <Typography key={idx} variant="body2">
                  {cls.classType}: {cls.availableSeats} seats | ₹{cls.fare}
                </Typography>
              ))}
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigate(`/book/${train.trainNumber}`)}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TrainResults;