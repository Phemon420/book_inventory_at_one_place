import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import useRoute from "./routes/routes.ts";
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';

const app=express();
const PORT=process.env.PORT || 4000;
const prisma = new PrismaClient();

app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/',useRoute);


app.listen(PORT,()=>{
    console.log(`server is running on port:${PORT}`);
});

export { prisma };