import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StyleSelection from './pages/StyleSelection';
import OutfitRecommendations from './pages/OutfitRecommendations';
import StoreDirectory from './pages/StoreDirectory';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#e74c3c',
    },
    background: {
      default: '#f5f6fa',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/styles" element={<StyleSelection />} />
          <Route path="/outfits/:styleId" element={<OutfitRecommendations />} />
          <Route path="/stores" element={<StoreDirectory />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 