import { Router } from 'express';
import { registerService } from '../controllers/register.controller';

const router = Router();
router.get('/', registerService);

export default router;