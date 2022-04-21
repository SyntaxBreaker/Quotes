import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from "./routes/authRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.dbURI)
    .then(() => app.listen(process.env.PORT || 3000))
    .catch(err => console.log(err))

app.use('/', authRoutes);
app.use('/', quoteRoutes);