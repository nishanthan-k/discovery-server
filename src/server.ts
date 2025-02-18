import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import asyncHandler from './utils/asyncHandler';

dotenv.config({ path: 'dev.env' });

const app = express();
const PORT = process.env.PORT;

app.get("/", asyncHandler((req: Request, res: Response) => res.send("Hii ")));

app.listen(PORT, () => console.log('Server started on port: ', PORT));