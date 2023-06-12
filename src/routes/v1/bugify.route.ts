import { SlackEventPayload } from '@/types/slack';
import express from 'express';
import { PoeClient } from 'poe-node-api';
import catchAsync from '@/utils/catchAsync';
import axios from 'axios';
import logger from '@/utils/logger';
const poeClient = new PoeClient({
  logLevel: 'silent',
});

async function sendMsg(text: string) {
  let response = '';

  const _text = text.replace(/&lt;@U05BNEE76N4>/gi, '').trim();
  logger.info(_text);
  await poeClient.sendMessage(_text, 'bugify', true, (result) => {
    response = result;
  });
  logger.info('Response: ' + response);
  return response;
}

async function initPoe() {
  await poeClient.init(true);
  await poeClient.getNextData();
}
const router = express.Router();
function containsRequiredWords(str: string) {
  const requiredWords = ['Title', 'Description', 'Expected', 'Actual', 'Resources'];
  return requiredWords.every((word) => new RegExp(`\\b${word}\\b`).test(str));
}
router.route('/').post(
  catchAsync(async (req, res) => {
    try {
      await initPoe();
      const challenge = req.body?.challenge || '';
      const body = req.body as SlackEventPayload;
      if (body.type === 'event_callback') {
        console.log(JSON.stringify(body, null, 2));
        if (body?.event?.type === 'app_mention') {
          res.json({ ok: true });
          const message = await sendMsg(body.event.text);
          if (message && message !== '' && containsRequiredWords(message)) {
            logger.info('Calling chat.postMessage');
            await axios.post(
              'https://slack.com/api/chat.postMessage',
              {
                channel: body?.event?.channel || '',
                text: `Dear <@${body.event.user}>\n${message
                  .replace(/Title:/gi, '*Title:*')
                  .replace(/Description:/gi, '*Description:*')
                  .replace(/Expected:/gi, '*Expected:*')
                  .replace(/Actual:/gi, '*Actual:*')
                  .replace(/Resources:/gi, '*Resources:*')}`,
              },
              {
                headers: {
                  Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            logger.info('End chat.postMessage');
            return;
          }
        } else if (body?.event?.type === 'member_joined_channel') {
          res.json({ ok: true });
          const user = body.event.user;
          if (user.includes('U03N8DKNK8U')) {
            await axios.post(
              'https://slack.com/api/chat.postMessage',
              {
                channel: body?.event?.channel || '',
                text: `Hi, I'm a AI powered chat bot that will help you create bug tickets with predefined template. Proudly made by <@>`,
              },
              {
                headers: {
                  Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            logger.info('End chat.postMessage');
            return;
          }
          return;
        }
        return;
      }
      // Handle required challenge responses
      return res.status(200).json({
        challenge,
      });
    } catch (err) {
      return;
    }
  })
);

export default router;
