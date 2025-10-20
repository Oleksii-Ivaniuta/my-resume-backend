import { SMTP } from '../constants/envVars.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendEmail } from '../utils/sendEmail.js';
import createHttpError from 'http-errors';

export const sendMail = async (payload) => {
  try {
    await sendEmail({
      from: getEnvVar(SMTP.SMTP_FROM),
      to: 'oivaniuta@gmail.com',
      subject: 'New message from my-resume web app',
      html: `<p>This message from ${payload.name} <br/> Email is: ${payload.email} <br/> Message text: ${payload.message}</p>`,
    });
  } catch (err) {
    throw createHttpError({
      status: 500,
      error: err,
      message: 'Failed to send email, please try again later',
    });
  }
  console.log(payload);
};
