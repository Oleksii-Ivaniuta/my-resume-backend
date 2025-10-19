import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import {
  createProjectController,
  deleteProjectController,
  getProjectByIdController,
  getProjectsController,
  updateProjectController,
} from '../controllers/projects.js';
import {
  createProjectSchema,
  updateProjectSchema,
} from '../validation/projects.js';

const router = Router();

router.get('/', ctrlWrapper(getProjectsController));

router.get('/:projectId', isValidId, ctrlWrapper(getProjectByIdController));

router.use(authenticate);

router.post(
  '/',
  upload.single('photo'),
  validateBody(createProjectSchema),
  ctrlWrapper(createProjectController),
);

router.patch(
  '/:projectId',
  isValidId,
  upload.single('photo'),
  validateBody(updateProjectSchema),
  ctrlWrapper(updateProjectController),
);

router.delete('/:projectId', isValidId, ctrlWrapper(deleteProjectController));

export default router;
