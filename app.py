from flask import Flask, request, jsonify
from flask_socketio import SocketIO, send, emit
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import os

app = Flask(__name__)
socketio = SocketIO(app)  

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
key = os.urandom(16)  # Generate random AES key for each node
node_id = "node1"
aes = AESEncryption(key)

# API route to receive and encrypt a message
@app.route('/api/send', methods=['POST'])
def send_message():
    data = request.get_json()
    message = data['message']
    
    # Encrypt the message using AES
    encrypted_message = aes.encrypt(message)
    
    # Simulate sending the message to the routing network
    response = f"Message received and encrypted: {encrypted_message.hex()}"
    
    return jsonify(response=response)

# WebSocket event to receive messages
@socketio.on('message')
def handle_message(msg):
    print(f"Received message: {msg}")
    
    # Decrypt the received message
    decrypted_message = aes.decrypt(bytes.fromhex(msg))
    print(f"Decrypted message: {decrypted_message}")
    
    # Broadcast 
    send(f"Decrypted message: {decrypted_message}", broadcast=True)

# Client sent encrypted messages
@socketio.on('send_encrypted')
def handle_encrypted_message(msg):
    print(f"Received encrypted message: {msg}")
    
    # Encrypt the received message and broadcast it
    encrypted_message = aes.encrypt(msg)
    print(f"Encrypted message: {encrypted_message.hex()}")
    
    emit('receive_encrypted', encrypted_message.hex(), broadcast=True)

# WebSocket event to handle when a client connects
@socketio.on('connect')
def handle_connect():
    print("Client connected")
    send("Client connected to WebSocket server")

# WebSocket event to handle when a client disconnects
@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnected")

if __name__ == '__main__':
    socketio.run(app, debug=True)
