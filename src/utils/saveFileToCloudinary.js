import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(ENV_VARS.CLOUDINARY_CLOUD_NAME),
  api_key: getEnvVar(ENV_VARS.CLOUDINARY_API_KEY),
  api_secret: getEnvVar(ENV_VARS.CLOUDINARY_API_SECRET),
});

export const saveFileToCloudinary = async (file, folder = 'projects') => {
  try {
    const response = await cloudinary.v2.uploader.upload(file.path, {
      folder,
      resource_type: 'image',
    });
    await fs.unlink(file.path);
    return {
      url: response.secure_url,
      publicId: response.public_id,
    };
  } catch (error) {
    console.error('❌ Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
};

export const deleteFileFromCloudinary = async (publicId) => {
  if (!publicId) {
    throw new Error('Public ID is required to delete a file');
  }

  try {
    const result = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: 'image',
      invalidate: true,
    });

    if (result.result !== 'ok' && result.result !== 'not found') {
      console.warn('⚠️ Cloudinary delete response:', result);
    }

    return result;
  } catch (error) {
    console.error('❌ Error deleting from Cloudinary:', error);
    throw new Error('Failed to delete file from Cloudinary');
  }
};
