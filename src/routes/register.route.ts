import { Router } from 'express';
import { registerService } from '../controllers/register/register.controller';
import { validateSchema } from '../middlewares/validateSchema';
import { RegisterSchema } from '../controllers/register/register.schema';

const router = Router();
router.post('/', validateSchema(RegisterSchema), registerService);

export default router;