import React from 'react';
import { Box, Typography, Container } from '@mui/material';


const Home = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', paddingTop: 4 , marginTop: 34}}>
      <Box>
        <Typography variant="h2" sx={{ color: 'blue', marginBottom: 2 }}>
          Welcome Home
        </Typography>
        <Typography variant="body1" sx={{ color: 'gray' }}>
          This is your home page. Enjoy your stay!
        </Typography>
        <Box sx={{
          backgroundColor: 'secondary.light',
          padding: 2,
          borderRadius: 1,
          boxShadow: 3,
          display: 'inline-block',
        }}>
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            Feel free to explore and customize your experience.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
