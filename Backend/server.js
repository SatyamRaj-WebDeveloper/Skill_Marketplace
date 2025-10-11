import express from 'express';
import dotenv from 'dotenv';
import http from  'http';
import {Server} from 'socket.io';
import cors from 'cors';
import {dbConnect} from  './Db/dbConnect.js'
import cookieParser from 'cookie-parser';

dotenv.config()
const app = express()

const server = http.createServer(app);

const io = new Server(server , {
    cors: {
        origin: "http://localhost:3000", // Your frontend URL
        methods: ["GET", "POST"]
    }
});

import initializeSocket from './socket.js';
initializeSocket(io);
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT
console.log(PORT)

dbConnect()


app.get('/' ,(req,res)=>{
    return res.send("health Check OK");
})

import userroutes from './routes/userRoutes.js'
import adminroutes from './routes/adminRoutes.js'

app.use('/api/v1' , userroutes);
app.use('/api/v1' , adminroutes);

server.listen(PORT , ()=>{
    console.log(`Sample app is listening on PORT ${PORT}`);
})