import jwt from 'jsonwebtoken';
import Message from './models/messageModel.js'; // Make sure to import your Message model

const initializeSocket = (io) => {

    // 1. Middleware to authenticate every new connection
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error("Authentication Error: No token provided."));
        }

        // Use a try-catch block to handle invalid/expired tokens
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded; // Attach user payload (e.g., { id: '...' })
            next();
        } catch (error) {
            return next(new Error("Authentication Error: Invalid token."));
        }
    });

    // 2. This function runs for each successfully authenticated client
    io.on("connection", (socket) => {
        console.log(`Authenticated user connected: ${socket.user.id}`);

        // 3. All event listeners for a specific user must be INSIDE this block

        // Event listener for when a user joins a conversation room
        socket.on('joinRoom', (conversationId) => {
            socket.join(conversationId);
            console.log(`User ${socket.user.id} joined room ${conversationId}`);
        });

        // Event listener for when a user sends a message
        socket.on('sendMessage', async (data) => {
            const { conversationId, text } = data;
            const senderId = socket.user.id;

            try {
                // Save the message to the database
                const message = new Message({
                    conversation: conversationId,
                    sender: senderId,
                    text: text,
                });
                await message.save();

                // Broadcast the new message to everyone in that specific room
                io.to(conversationId).emit('newMessage', message);
            } catch (error) {
                console.error("Error saving or sending message:", error.message);
            }
        });

        // Event listener for when a user disconnects
        socket.on('disconnect', () => {
            console.log(`User ${socket.user.id} disconnected`);
        });
    });
};

export default initializeSocket;