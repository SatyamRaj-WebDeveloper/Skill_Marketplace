import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config()
const app = express()

app.use(express.json());


const PORT = process.env.PORT

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}))

app.listen(PORT , ()=>{
    console.log(`Sample app is listening on PORT ${PORT}`);
})