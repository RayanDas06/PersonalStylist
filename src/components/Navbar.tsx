import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <ShoppingBagIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Celebrity Picks
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/styles">
            Styles
          </Button>
          <Button color="inherit" component={RouterLink} to="/stores">
            Stores
          </Button>
          <Button color="inherit" component={RouterLink} to="/chatbot">
            ChatBot
          </Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 