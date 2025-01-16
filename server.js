const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Set up Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the frontend directory
app.use(express.static('frontend'));

// Track connected users (optional feature for showing user indicators)
const users = new Set();

// Handle socket connections
io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);
    users.add(socket.id);
    io.emit('user-update', Array.from(users)); // Notify all clients about active users

    // Listen for drawing data from a client and broadcast it to others
    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data);
    });

    // Listen for 'clear-canvas' event
    socket.on('clear-canvas', () => {
        io.emit('clear-canvas'); // Broadcast the clear-canvas event to all clients
    });

    // Listen for disconnection
    socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.id}`);
        users.delete(socket.id);
        io.emit('user-update', Array.from(users)); // Update the user list
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
