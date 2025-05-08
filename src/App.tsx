import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import StyleSelection from './pages/StyleSelection.tsx';
import OutfitRecommendations from './pages/OutfitRecommendations.tsx';
import StoreDirectory from './pages/StoreDirectory.tsx';
import ChatBot from './pages/Chatbot.tsx'; // Ensure casing matches the file system
import ClosetUpload from './pages/ClosetUpload.tsx';


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
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/closet-upload" element={<ClosetUpload />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
