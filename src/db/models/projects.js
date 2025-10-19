import { Schema, model } from 'mongoose';

const projectsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
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
    type: {
      type: String,
      required: true,
    },
    role: {
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
