import { ENV_VARS } from '../constants/envVars.js';
import { getEnvVar } from './getEnvVar.js';

const BOT_TOKEN = getEnvVar(ENV_VARS.TELEGRAM_TOKEN);
const CHAT_ID = getEnvVar(ENV_VARS.TELEGRAM_CHAT_ID);

export async function sendTelegram({ name, email, message }) {
  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error('Telegram env missing: TELEGRAM_TOKEN or TELEGRAM_CHAT_ID');
  }

  const text =
    `🧾 New message from resume app\n` +
    `👤 Name: ${name}\n` +
    `✉️ Email: ${email}\n` +
    `💬 Message:\n${message}`;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram error ${res.status}: ${body}`);
  }
}
