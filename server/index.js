import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

// Routes Path
import authRoutes from './routes/auth.route.js';
import contactRoutes from './routes/contact.route.js'
import messageRoutes from './routes/message.route.js'
import channelRoutes from './routes/channel.route.js'
import setupSocket from './socket.js';
const app = express();
const port = process.env.PORT;
const databaseURL = process.env.MONGODB_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}))

app.use("/uploads/profiles", express.static("uploads/profiles"))
app.use(express.json());
app.use(cookieParser())


// routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/channel', channelRoutes)

const server = app.listen(port, () => {
    console.log(`server is running on ${port}`)
})

// 2) importing server into socket instance
setupSocket(server)

mongoose
    .connect(databaseURL)
    .then(() => {
        console.log('MongoDB Connected Successfuly')
    })
    .catch((error) => {
        console.log(error.message)
    })