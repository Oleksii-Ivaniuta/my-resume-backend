import { sendMail } from '../services/send-mail.js';

export const sendMailController = async (req, res, next) => {
  const payload = await req.body;
  await sendMail(payload);

  res.json({
    status: 200,
    message: 'Successfully sent message!',
    data: payload,
  });
};
