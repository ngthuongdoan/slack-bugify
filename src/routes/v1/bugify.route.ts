import { SlackEventPayload } from '@/types/slack';
import axios from 'axios';
import express from 'express';
import { WebClient, LogLevel } from '@slack/web-api';
import { PoeClient } from 'poe-node-api';
import catchAsync from '@/utils/catchAsync';
// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG,
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

const router = express.Router();

router.route('/').post(
  catchAsync(async (req, res) => {
    await poeClient.init(true);
    await poeClient.getNextData();
    const challenge = req.body?.challenge || '';
    // const type = req.body?.type;
    const body = req.body as SlackEventPayload;
    if (body.type === 'event_callback') {
      console.log(JSON.stringify(body, null, 2));
      if (body?.event?.type === 'app_mention') {
        const message = await sendMsg(body.event.text);
        console.log('🚀 -------------------------------------------------------------🚀');
        console.log('🚀 ~ file: bugify.route.ts:39 ~ catchAsync ~ message:', message);
        console.log('🚀 -------------------------------------------------------------🚀');
        if (message) {
          res.status(200).json({
            text: 'Hello',
          }); // end Slack 3s timeout
          await client.chat.postMessage({
            channel: body?.event?.channel || '',
            text: message,
          });
        } else {
          return res.end();
        }
      }
      return res.status(200).json({
        text: 'Hello, world.',
      });
    }
    return res.status(200).json({
      challenge,
    });
  })
);

export default router;
