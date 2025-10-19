import { SORT_ORDER } from '../constants/sortOrder.js';
import { ProjectsCollection } from '../db/models/projects.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getProjects = async ({
  page = 1,
  perPage = 6,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'order',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const projectsQuery = ProjectsCollection.find();

  const projectsCount = await ProjectsCollection.find({})
    .merge(projectsQuery)
    .countDocuments();

  const contacts = await projectsQuery
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(projectsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getProjectById = async (projectId) => {
  const project = await ProjectsCollection.findOne({
    _id: projectId,
  });
  return project;
};

export const createProject = async (payload) => {
  const project = await ProjectsCollection.create(payload);
  return project;
};

export const deleteProject = async (projectId) => {
  const project = await ProjectsCollection.findOneAndDelete({
    _id: projectId,
  });
  return project;
};

export const updateProject = async (projectId, payload, options = {}) => {
  const rawResult = await ProjectsCollection.findOneAndUpdate(
    {
      _id: projectId,
    },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) {
    return null;
  }

  return {
    project: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const getProjectPhotoUrl = async (projectId) => {
  const project = await ProjectsCollection.findOne({
    _id: projectId,
  });
  return project.photoUrl;
};
