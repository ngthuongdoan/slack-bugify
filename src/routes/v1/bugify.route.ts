import { SlackEventPayload } from '@/types/slack';
import express from 'express';
import { WebClient, LogLevel } from '@slack/web-api';
import { PoeClient } from 'poe-node-api';
import catchAsync from '@/utils/catchAsync';

const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
  logLevel: LogLevel.INFO,
});

const poeClient = new PoeClient({
  logLevel: 'silent',
});

async function sendMsg(text: string) {
  let response = '';
  await poeClient.sendMessage(text, 'bugify', true, (result) => {
    response = result;
  });
  return response;
}

async function initPoe() {
  await poeClient.init(true);
  await poeClient.getNextData();
}
const router = express.Router();

router.route('/').post(
  catchAsync(async (req, res) => {
    try {
      await initPoe();
      const challenge = req.body?.challenge || '';
      const body = req.body as SlackEventPayload;
      if (body.type === 'event_callback') {
        console.log(JSON.stringify(body, null, 2));
        if (body?.event?.type === 'app_mention') {
          const message = await sendMsg(body.event.text);
          if (message && message !== '') {
            await client.chat.postMessage({
              channel: body?.event?.channel || '',
              text: message,
            });
          }
          return res.status(200).end();
        }
        return res.status(200).json({
          text: 'Hello, world.',
        });
      }
      // Handle required challenge responses
      return res.status(200).json({
        challenge,
      });
    } catch (err) {
      return res.status(200).json({
        text: 'Sorry, the server returned',
      });
    }
  })
);

export default router;
