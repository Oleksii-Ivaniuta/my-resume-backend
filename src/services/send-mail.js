import createHttpError from 'http-errors';
import { sendTelegram } from '../utils/sendTelegram.js';

export const sendMail = async (payload) => {
  try {
    await sendTelegram(payload);
  } catch (err) {
    throw createHttpError(
      500,
      `Failed to send Telegram message ${err.message}`,
    );
  }
};
