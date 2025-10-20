import { Router } from 'express';
import authRouter from './auth.js';
import projectsRouter from './projects.js';
import sendMailRouter from './send-mail.js';
const router = Router();

router.use('/projects', projectsRouter);
router.use('/auth', authRouter);
router.use('/send-mail', sendMailRouter);

export default router;
