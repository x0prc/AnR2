import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { sendMessageViaAPI } from './utils/api';
import { socket } from './utils/socket';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Listen for encrypted messages from WebSocket
    socket.on('receive_encrypted', (encryptedMessage) => {
      setMessages((prevMessages) => [...prevMessages, `Encrypted: ${encryptedMessage}`]);
    });

    return () => {
      socket.off('receive_encrypted');
    };
  }, []);

  const handleSend = async () => {
    setMessages((prevMessages) => [...prevMessages, `You: ${inputMessage}`]);

    // Emit the message to the WebSocket server
    socket.emit('send_encrypted', inputMessage);

    // Send the message via REST API
    const response = await sendMessageViaAPI(inputMessage);
    setMessages((prevMessages) => [...prevMessages, `API Response: ${response.encrypted_message}`]);

    setInputMessage('');
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center">AnR2</h1>
          <MessageList messages={messages} />
          <MessageInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSend={handleSend}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
