import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import useRoute from "./routes/routes.js";
import { PrismaClient } from '@prisma/client';

const app=express();
const PORT=process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use('/',useRoute);

app.listen(PORT,()=>{
    console.log(`server is running on port:${PORT}`);
});

export { prisma };