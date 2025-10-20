import Joi from 'joi';

export const sendEmaildSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(30).required(),
  message: Joi.string().min(5).max(300).required(),
});
