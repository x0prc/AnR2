const crypto = require('crypto');

function garlicEncrypt(message) {
  // For simplicity, let's use AES encryption here. You can integrate your garlic routing logic
  const algorithm = 'aes-256-cbc';
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
}

module.exports = { garlicEncrypt };
