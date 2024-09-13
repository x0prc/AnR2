import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

document.getElementById('message-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Get the message from the input field
  const userMessage = document.getElementById('userMessage').value;

  if (userMessage) {
    // Send the message to the backend for encryption via garlic routing
    try {
      const response = await fetch('/api/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      // Display the encrypted message in the output section
      document.getElementById('encryptedOutput').innerText = data.encryptedMessage || 'Error encrypting message';
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('encryptedOutput').innerText = 'An error occurred';
    }
  } else {
    alert('Please enter a message to encrypt.');
  }
});
