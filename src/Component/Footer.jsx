import React from 'react';
import { Box, Typography, Link, Container, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#333', color: 'white', padding: '20px 0' }}>
      <Container>
        <Grid container spacing={3} justifyContent="center">
          {/* Left side - Copyright */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" align="center">
              &copy; 2025 Your Company Name. All Rights Reserved.
            </Typography>
          </Grid>
          
          {/* Right side - Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" align="center">
              <Link href="/privacy-policy" color="inherit" sx={{ marginRight: 2 }}>
                Privacy Policy
              </Link>
              |
              <Link href="/terms-of-service" color="inherit" sx={{ marginLeft: 2 }}>
                Terms of Service
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
