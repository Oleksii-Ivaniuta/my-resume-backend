import { ENV_VARS } from '../constants/envVars.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendEmail } from '../utils/sendEmail.js';
import createHttpError from 'http-errors';

export const sendMail = async (payload) => {
  try {
    await sendEmail({
      from: getEnvVar(ENV_VARS.MAIL_FROM), // має бути верифікований Sender у SendGrid
      to: getEnvVar(ENV_VARS.MAIL_TO),
      subject: 'New message from my-resume web app',
      // корисно додати replyTo, щоб відповідати напряму юзеру
      replyTo: { email: payload.email, name: payload.name },
      text: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
      html: `<p>This message from ${payload.name}<br/>Email: ${payload.email}<br/>Message text: ${payload.message}</p>`,
    });
  } catch (err) {
    throw createHttpError(500, err.message);
  }
};
