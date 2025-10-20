// utils/sendEmail.js
import nodemailer from 'nodemailer';
import dns from 'dns';
import { SMTP } from '../constants/envVars.js';
import { getEnvVar } from './getEnvVar.js';

// Щоб уникнути зависань на IPv6 (типово для деяких хостингів, у т.ч. Render)
dns.setDefaultResultOrder?.('ipv4first');

const host = getEnvVar(SMTP.SMTP_HOST); // smtp.gmail.com
const port = Number(getEnvVar(SMTP.SMTP_PORT)); // 465
const secure = port === 465; // для 465 — true

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: {
    user: getEnvVar(SMTP.SMTP_USER), // your.gmail@gmail.com
    pass: getEnvVar(SMTP.SMTP_PASSWORD), // App Password (не звичайний пароль)
  },
  family: 4, // форсимо IPv4 — менше шансів зависань
  connectionTimeout: 8000, // запобігає вічному очікуванню
  greetingTimeout: 8000,
  socketTimeout: 10000,
  tls: { servername: host }, // коректний SNI
});

export const sendEmail = async (options) => {
  return transporter.sendMail(options);
};
