import Joi from 'joi';

const httpUri = Joi.string().uri({ scheme: ['http', 'https'] });

const localizedStrRequired = Joi.string().trim().min(2);
const localizedStrOptional = Joi.string().trim().min(2);

export const createProjectSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  order: Joi.number().required(),

  // descriptions
  descriptionEn: localizedStrRequired.required(),
  descriptionUk: localizedStrRequired.required(),
  descriptionPt: localizedStrRequired.required(),

  // urls
  photoUrl: httpUri.optional().allow(''),
  liveUrl: httpUri.required(),
  frontCodeUrl: httpUri.optional().allow(''),
  backCodeUrl: httpUri.optional().allow(''),

  techStack: Joi.string().trim().required(),

  // types
  typeEn: localizedStrRequired.required(),
  typeUk: localizedStrRequired.required(),
  typePt: localizedStrRequired.required(),

  // roles
  roleEn: localizedStrRequired.required(),
  roleUk: localizedStrRequired.required(),
  rolePt: localizedStrRequired.required(),
});

export const updateProjectSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  order: Joi.number(),

  // descriptions
  descriptionEn: localizedStrOptional,
  descriptionUk: localizedStrOptional,
  descriptionPt: localizedStrOptional,

  // urls
  photoUrl: httpUri.allow(''),
  liveUrl: httpUri,
  frontCodeUrl: httpUri.allow(''),
  backCodeUrl: httpUri.allow(''),

  techStack: Joi.string().trim(),

  // types
  typeEn: localizedStrOptional,
  typeUk: localizedStrOptional,
  typePt: localizedStrOptional,

  // roles
  roleEn: localizedStrOptional,
  roleUk: localizedStrOptional,
  rolePt: localizedStrOptional,
});
