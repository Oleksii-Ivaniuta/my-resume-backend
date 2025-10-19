import { Schema, model } from 'mongoose';

const projectsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    descriptionEn: {
      type: String,
      required: true,
    },
    descriptionUk: {
      type: String,
      required: true,
    },
    descriptionPt: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: false,
    },
    liveUrl: {
      type: String,
      required: true,
    },
    frontCodeUrl: {
      type: String,
      required: false,
    },
    backCodeUrl: {
      type: String,
      required: false,
    },
    techStack: {
      type: String,
      required: true,
    },
    typeEn: {
      type: String,
      required: true,
    },
    typeUk: {
      type: String,
      required: true,
    },
    typePt: {
      type: String,
      required: true,
    },
    roleEn: {
      type: String,
      required: true,
    },
    roleUk: {
      type: String,
      required: true,
    },
    rolePt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProjectsCollection = model('projects', projectsSchema);
