import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
app.use(cors)

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("hello world");
})

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})

