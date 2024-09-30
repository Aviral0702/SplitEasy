import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/auth.route.js';
import connectDB from './db/dbconfig.js'
import cors from 'cors';
dotenv.config();
const app = express();
// Middleware to parse JSON
app.use(cors())
app.use(express.json());

connectDB();
// Routes
app.use('/api/auth', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
