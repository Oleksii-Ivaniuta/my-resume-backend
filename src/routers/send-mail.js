import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { sendMailController } from '../controllers/send-mail.js';
import { mailerAuth } from '../middlewares/mailerAuth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { sendEmaildSchema } from '../validation/mail.js';

const router = Router();

router.use(mailerAuth);

router.post(
  '/',
  validateBody(sendEmaildSchema),
  ctrlWrapper(sendMailController),
);

export default router;
