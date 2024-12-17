// 3) Importing server from socket.io and using as SocketIoserver
import { Server as SocketIoServer } from 'socket.io'
import Message from './models/message.model.js';

// 1) Creating set-up socket functionality
const setupSocket = (server) => {

    // 4) creating io using new SocketIoserver method 
    const io = new SocketIoServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    // 5) Creating map for sockets Id
    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log("client Disconncted")
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId)
                break;
            }
        }
    }

    // Sending message
    const sendMessage = async (message) => {
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient);

        const createdMessage = await Message.create(message);
        const messageData = await Message.findById(createdMessage._id)
            .populate("sender", "id email firstName lastName image color")
            .populate("recipient", "id email firstName lastName image color")

        if (recipientSocketId) {
            io.to(recipientSocketId).emit("recieveMessage", messageData);
        }
        if (senderSocketId) {
            io.to(senderSocketId).emit("recieveMessage", messageData);
        }
    }

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`user Connected:${userId} and Socket Id :${socket.id}`)
        } else {
            console.log("User Id not provided during connection")
        }

        // message
        socket.on('sendMessage', sendMessage)
        socket.on("disconnect", () => disconnect(socket))
    })

}

export default setupSocket;