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

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const project = await createProject({
    ...body,
    photoUrl: photoUrl,
  });

  res.status(201).json({
    status: 201,
    maessage: 'Succesfully created project!',
    data: project,
  });
};

export const deleteProjectController = async (req, res, next) => {
  const { projectId } = req.params;
  const oldPhotoUrl = await getProjectPhotoUrl(projectId);

  if (oldPhotoUrl) {
    await deleteFileFromUploadDir(oldPhotoUrl);
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

  const oldPhotoUrl = await getProjectPhotoUrl(projectId);

  if (photo) {
    if (oldPhotoUrl) {
      await deleteFileFromUploadDir(oldPhotoUrl);
    }
    photoUrl = await saveFileToUploadDir(photo);
  }

  const result = await updateProject(projectId, {
    ...body,
    photoUrl: photoUrl,
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
