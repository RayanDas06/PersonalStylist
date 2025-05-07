import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';  // Fixed the import path for App.tsx
import './index.css';     // Fixed the import path for index.css

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
