import { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { z } from 'zod';
import { readFileData, writeFileData } from './controllers/register/register.controller';
import { RegisterSchema } from './controllers/register/register.schema';
import asyncHandler from './global/utils/asyncHandler';
import { errorMiddleware } from './middlewares/errorMiddleware';
import registerRoutes from './routes/register.route';

dotenv.config({ path: 'dev.env' });

const app = express();
const PORT = process.env.PORT;
const HEARTBEAT_INTERVAL = Number(process.env.HEARTBEAT_INTERVAL) * 1000;
const HEARTBEAT_THRESHOLD = Number(process.env.HEARTBEAT_INTERVAL) * 1000;

app.use(express.json());
app.use('/api/registers', registerRoutes);

app.get("/", asyncHandler((req: Request, res: Response) => res.send("Hii")));

app.use(errorMiddleware);

// Heartbeat Cleanup Task
const cleanupServices = async () => {
  try {
      const timeout = HEARTBEAT_THRESHOLD;
      const services: Record<string, z.infer<typeof RegisterSchema>> = await readFileData();

      const now = Date.now();
      let updated = false;

      for (const name in services) {
          if (now - services[name].lastHeartBeat > timeout) {
              console.log(`Removing service: ${name}`);
              delete services[name];
              updated = true;
          } else {
            console.log(`Service: ${name} - ${services[name].status}`)
          }
      }

      if (updated) {
          await writeFileData(services);
      }
  } catch (error) {
      console.error("Error during cleanup:", error);
  }
};

// Run cleanup every second
setInterval(cleanupServices, HEARTBEAT_INTERVAL);


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
