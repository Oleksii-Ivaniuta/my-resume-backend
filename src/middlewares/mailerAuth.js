import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';

export const mailerAuth = async (req, res, next) => {
  const token = getEnvVar(ENV_VARS.MAIL_TOKEN);
  const authHeader = await req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please provide authorization header'));
    return;
  }
  const bearer = authHeader.split(' ')[0];
  const reqToken = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !reqToken) {
    next(createHttpError(401, 'Auth header should be type of Bearer'));
    return;
  }
  if (reqToken !== token) {
    next(createHttpError(400, 'Invalid token'));
    return;
  }
  next();
};
