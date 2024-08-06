import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate('/');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#f9f9f9',
        textAlign: 'center',
        p: 2,
      }}
    >
      <ErrorIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
      <Typography variant="h4" component="h1" gutterBottom>
        404 Not Found
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Ups! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{ mt: 2 }}
      >
        Go back to home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
