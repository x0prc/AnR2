import React from 'react';
import { ListGroup } from 'react-bootstrap';

function MessageList({ messages }) {
  return (
    <ListGroup>
      {messages.map((message, index) => (
        <ListGroup.Item key={index}>{message}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default MessageList;
