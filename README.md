
![A](https://github.com/user-attachments/assets/b422e604-047c-471d-bad6-12f05884ea94)
A Proof-of-Concept Project prepared in accordance to create Anonymous Routing for files/messages. It is similar to Onion Routing but enhances performance by bundling multiple messages together. This project allows users to send a message, which is then encrypted on the backend via a simplified Garlic Routing mechanism, and the encrypted message is displayed back to the user.

# Motivation
Inspiration for this project came from communicating with a person whom I wanted to share a message without anyone else knowing about the secret. I could've just used pre-existent methods, but where is the nerve-wracking hardwork in that ;). 

# Prerequisites
[Docker](https://get.docker.com/) <br>
[Python](https://python.org/) <br>
more in the [Requirements](https://github.com/x0prc/AnR2/requirements.txt) 

# Usage
## [![My Skills](https://skillicons.dev/icons?i=github&perline=1)](https://skillicons.dev)
`git clone https://github.com/x0prc/AnR2`

## [![My Skills](https://skillicons.dev/icons?i=react&perline=1)](https://skillicons.dev)
`npx create-react-app anonymous-routing` <br>
`cd anonymous-routing`<br>
`npm start`

## [![My Skills](https://skillicons.dev/icons?i=flask&perline=1)](https://skillicons.dev)
`pip install Flask` <br>
`mkdir AnR2` <br>
`cd AnR2` <br>
`touch app.py` 

# Installation
Run the Flask server <br>
`python3 app.py`

Run the Node Server <br>
`npm start`

WebSocket Support <br>
`pip install flask-socketio` 

Run the Vercel Instance <br>
`npm run vercel-build`

# Working Mechanism Flow
<img width="2560" alt="AnR2-Flow (1)" src="https://github.com/user-attachments/assets/f6f7c7b1-f1d4-4888-ae09-515a6d1e4528">

# Future Enhancements
True Garlic Routing: Implement full garlic routing encryption where multiple messages are bundled and routed through multiple nodes.
User Authentication: Add user authentication for tracking messages securely.
