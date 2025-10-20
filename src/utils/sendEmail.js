import sgMail from '@sendgrid/mail';
import createHttpError from 'http-errors';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (options) => {
  try {
    const [res] = await sgMail.send({
      ...options,
      trackingSettings: {
        clickTracking: { enable: false, enableText: false },
        openTracking: { enable: false },
      },
    });
    return res;
  } catch (error) {
    throw createHttpError(
      502,
      error?.response?.body?.errors?.[0]?.message || error.message,
    );
  }
};
