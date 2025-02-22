import { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import asyncHandler from './global/utils/asyncHandler';
import registerRoutes from './routes/register.route';
import { errorMiddleware } from './middlewares/errorMiddleware';

dotenv.config({ path: 'dev.env' });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/registers', registerRoutes);

app.get("/", asyncHandler((req: Request, res: Response) => res.send("Hii")));

app.use(errorMiddleware);

// In local development, run the server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

// For Vercel deployment
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
