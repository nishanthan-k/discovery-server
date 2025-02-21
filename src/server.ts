import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import asyncHandler from './utils/asyncHandler';
import registerRoutes from './routes/register.route';

dotenv.config({ path: 'dev.env' });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/registers', registerRoutes);

app.get("/", asyncHandler((req: Request, res: Response) => res.send("Hii")));

// In local development, run the server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

// For Vercel deployment
import { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
