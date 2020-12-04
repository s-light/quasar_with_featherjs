import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
// import './style.css';

// Set up socket.io
const socket = io('http://localhost:3030');
// Initialize a Feathers app
const app = feathers();

// Register socket.io to talk to our server
app.configure(socketio(socket));



// Form submission handler that sends a new message
async function sendMessage (event) {
    console.log('sendMessage');
    const messageInput = document.getElementById('message-text');

    // Create a new message with the input field value
    await app.service('messages').create({
        text: messageInput.value
    });

    messageInput.value = '';
}

// Renders a single message on the page
function addMessage (message) {
    let message_list = document.querySelector('#messages');
    if (message_list) {
        const message_entry = document.createElement('li');
        message_entry.textContent = `${message.text}`;
        message_list.appendChild(message_entry);
    }
}

const main = async () => {
    console.log('main init');
    const message_send_btn = document.querySelector('#message-send-btn');
    message_send_btn.addEventListener('click', sendMessage)
    const message_text = document.querySelector('#message-text');
    message_text.addEventListener('keyup', event => {
        if (event.code === 'Enter') {
            sendMessage(event)
        }
    });

    // Find all existing messages
    const messages = await app.service('messages').find();

    // Add existing messages to the list
    messages.forEach(addMessage);

    // Add any newly created message to the list in real-time
    app.service('messages').on('created', addMessage);
};

main();
