import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the correct module
import App from './App';

// Find the root element in the DOM
const rootElement = document.getElementById('root');

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
