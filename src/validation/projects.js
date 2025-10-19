import Joi from 'joi';

export const createProjectSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().trim().min(10).required(),
  photoUrl: Joi.string().uri().optional().allow(''),
  liveUrl: Joi.string().uri().required(),
  frontCodeUrl: Joi.string().uri().optional().allow(''),
  backCodeUrl: Joi.string().uri().optional().allow(''),
  techStack: Joi.string().trim().required(),
  type: Joi.string().trim().required(),
  role: Joi.string().trim().required(),
});

export const updateProjectSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  description: Joi.string().trim().min(10),
  photoUrl: Joi.string().uri().allow(''),
  liveUrl: Joi.string().uri(),
  frontCodeUrl: Joi.string().uri().allow(''),
  backCodeUrl: Joi.string().uri().allow(''),
  techStack: Joi.string().trim(),
  type: Joi.string().trim(),
  role: Joi.string().trim(),
}).min(1);
