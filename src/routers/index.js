import { Router } from 'express';
import authRouter from './auth.js';
import projectsRouter from './projects.js';
const router = Router();

router.use('/projects', projectsRouter);
router.use('/auth', authRouter);

export default router;
