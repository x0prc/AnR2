import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function MessageInput({ inputMessage, setInputMessage, handleSend }) {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Enter message"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button variant="primary" onClick={handleSend}>Send</Button>
    </InputGroup>
  );
}

export default MessageInput;
