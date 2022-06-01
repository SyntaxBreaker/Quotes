import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/authRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN
}));

mongoose.connect(process.env.dbURI)
    .then(() => app.listen(process.env.PORT || 3000))
    .catch(err => console.log(err))

app.use('/', authRoutes);
app.use('/', quoteRoutes);