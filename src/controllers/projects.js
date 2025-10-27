import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjectPhotoUrl,
  getProjects,
  updateProject,
} from '../services/projects.js';
import { deleteFileFromUploadDir } from '../utils/deleteFileFromUploadDir.js';
import {
  deleteFileFromCloudinary,
  saveFileToCloudinary,
} from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';

export const getProjectsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const projects = await getProjects({
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.json({
    status: 200,
    message: 'Successfully found projects!',
    data: projects,
  });
};

export const getProjectByIdController = async (req, res, next) => {
  const { projectId } = req.params;
  const project = await getProjectById(projectId);
  if (!project) {
    throw createHttpError(404, 'Project not found');
  }
  res.json({
    status: 200,
    message: 'Successfully found project',
    data: project,
  });
};

export const createProjectController = async (req, res) => {
  const body = await req.body;
  const photo = await req.file;
  let photoUrl;
  let photoPublicId;

  if (photo) {
    if (getEnvVar(ENV_VARS.ENABLE_CLOUDINARY) === 'true') {
      const res = await saveFileToCloudinary(photo);
      photoUrl = res.url;
      photoPublicId = res.publicId;
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const project = await createProject({
    ...body,
    photoUrl: photoUrl,
    photoPublicId: photoPublicId,
  });

  res.status(201).json({
    status: 201,
    maessage: 'Succesfully created project!',
    data: project,
  });
};

export const deleteProjectController = async (req, res, next) => {
  const { projectId } = req.params;
  const oldPhoto = await getProjectPhotoUrl(projectId);
  const oldPhotoUrl = oldPhoto.url;
  const oldPhotoPublicId = oldPhoto.id;

  if (oldPhotoUrl) {
    await deleteFileFromUploadDir(oldPhotoUrl);
  }

  if (oldPhotoPublicId) {
    await deleteFileFromCloudinary(oldPhotoPublicId);
  }

  const project = await deleteProject(projectId);
  if (!project) {
    throw createHttpError(404, 'Project not found');
  }

  res.status(204).send();
};

export const updateProjectController = async (req, res, next) => {
  const { projectId } = req.params;
  const body = await req.body;
  const photo = await req.file;
  let photoUrl;
  let photoPublicId;
  const oldPhoto = await getProjectPhotoUrl(projectId);
  const oldPhotoUrl = oldPhoto.url;
  const oldPhotoPublicId = oldPhoto.id;

  if (photo) {
    if (getEnvVar(ENV_VARS.ENABLE_CLOUDINARY) === 'true') {
      const res = await saveFileToCloudinary(photo);
      photoUrl = res.url;
      photoPublicId = res.publicId;
      if (oldPhotoPublicId) {
        await deleteFileFromCloudinary(oldPhotoPublicId);
      }
    } else {
      if (oldPhotoUrl) {
        await deleteFileFromUploadDir(oldPhotoUrl);
      }
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateProject(projectId, {
    ...body,
    photoUrl: photoUrl,
    photoPublicId: photoPublicId,
  });

  if (!result) {
    throw createHttpError(404, 'Project not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched project with id ${projectId}!`,
    data: result.project,
  });
};
