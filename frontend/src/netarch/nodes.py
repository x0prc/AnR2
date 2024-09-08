 class EntryNode:
    def __init__(self):
        self.connected_clients = []
    
    def accept_connection(self, client):
        self.connected_clients.append(client)
        # Forward the encrypted message to the next node
        self.forward_message(client.encrypted_message, next_node)
        
 class RelayNode:
    def forward_message(self, encrypted_message, next_node):
        # Forward the encrypted message to the next node
        next_node.receive_message(encrypted_message)
        
  class ExitNode:
    def receive_message(self, encrypted_message):
        # Decrypt the message
        decrypted_message = self.decrypt(encrypted_message)
        # Forward the message to the final destination
        self.send_to_destination(decrypted_message)