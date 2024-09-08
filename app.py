from flask import Flask, request, jsonify
from Crypto.Cipher import AES
import os

app = Flask(__name__)

# AES Encryption/Decryption Setup
class AESEncryption:
    def __init__(self, key):
        self.key = key

    def encrypt(self, plain_text):
        cipher = AES.new(self.key, AES.MODE_CBC)
        ct_bytes = cipher.encrypt(pad(plain_text.encode(), AES.block_size))
        return cipher.iv + ct_bytes

    def decrypt(self, cipher_text):
        iv = cipher_text[:AES.block_size]
        ct = cipher_text[AES.block_size:]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return unpad(cipher.decrypt(ct), AES.block_size).decode()

# Node Configuration
key = os.urandom(16)
node_id = "node1"
aes = AESEncryption(key)

@app.route('/api/send', methods=['POST'])
def send_message():
    data = request.get_json()
    message = data['message']

    # Encrypt the message
    encrypted_message = aes.encrypt(message)

    # Simulate sending the message to the routing network
    response = f"Message received and encrypted: {encrypted_message.hex()}"

    return jsonify(response=response)

if __name__ == '__main__':
    app.run(debug=True)