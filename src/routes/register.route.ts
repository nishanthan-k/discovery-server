import { Router } from 'express';
import { registerService } from '../controllers/register.controller';

const router = Router();
router.post('/', registerService);

export default router;