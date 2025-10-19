import fs from 'fs/promises';
import path from 'path';
import { UPLOAD_DIR } from '../constants/dir.js';

export const deleteFileFromUploadDir = async (filePathOrUrl) => {
  try {
    if (!filePathOrUrl) return;
    const fileName = path.basename(filePathOrUrl);
    const absolutePath = path.join(UPLOAD_DIR, fileName);
    await fs.access(absolutePath);
    await fs.unlink(absolutePath);
    console.log(`🗑️  Deleted old file: ${fileName}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(`File not found, skip delete: ${filePathOrUrl}`);
    } else {
      console.error(`Error deleting file: ${err.message}`);
    }
  }
};
