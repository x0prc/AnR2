const express = require('express');
const bodyParser = require('body-parser');
const { garlicEncrypt } = require('./garlicEncryption'); // Import your garlic routing encryption logic

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/encrypt', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    // Perform garlic routing encryption
    const encryptedMessage = garlicEncrypt(message);
    
    // Return the encrypted message
    res.json({ encryptedMessage });
  } catch (error) {
    console.error('Encryption error:', error);
    res.status(500).json({ error: 'Failed to encrypt message' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
