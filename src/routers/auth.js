import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  ChangePasswordSchema,
  loginUserSchema,
  registerUserSchema,
} from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  changePasswordController,
  loginUserController,
  logoutUserController,
  refreshUsersSessionController,
  registerUserController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post(
  '/change-password',
  validateBody(ChangePasswordSchema),
  ctrlWrapper(changePasswordController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUsersSessionController));
export default router;
