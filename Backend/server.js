import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {dbConnect} from  './Db/dbConnect.js'
import cookieParser from 'cookie-parser';

dotenv.config()
const app = express()

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT
console.log(PORT)

dbConnect()

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}))

app.get('/' ,(req,res)=>{
    return res.send("health Check OK");
})

import userroutes from './routes/userRoutes.js'

app.use('/api/v1' , userroutes);

app.listen(PORT , ()=>{
    console.log(`Sample app is listening on PORT ${PORT}`);
})