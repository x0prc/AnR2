import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const sendMessage = async () => {
    try {
      const res = await axios.post('/api/send', { message });
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>AnR2 - A better way to anonymously route your messages.</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message here"
      />
      <button onClick={sendMessage}>Send Message</button>
      <div>{response && <p>Response: {response}</p>}</div>
    </div>
  );
}

export default App;

