import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { projectId } = req.params;
  if (!isValidObjectId(projectId)) {
    throw createHttpError(400, 'Bad Request');
  }
  next();
};
