import { SlackEventPayload } from '@/types/slack';
import axios from 'axios';
import express from 'express';
import { WebClient, LogLevel } from '@slack/web-api';
import { PoeClient } from 'poe-node-api';
// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG,
});

const poeClient = new PoeClient({
  logLevel: 'silent',
});

async function sendMsg(ts: string, channel: string, text: string) {
  await poeClient.sendMessage(text, 'bugify', true, async (result) => {
    await client.chat.update({
      channel: channel || '',
      ts,
      text: result,
    });
  });
}

const router = express.Router();

router.route('/').post(async (req, res, next) => {
  await poeClient.init(true);
  await poeClient.getNextData();
  const challenge = req.body?.challenge || '';
  // const type = req.body?.type;
  const body = req.body as SlackEventPayload;
  if (body.type === 'event_callback') {
    console.log(JSON.stringify(body, null, 2));
    if (body?.event?.type === 'app_mention') {
      // console.log(JSON.stringify(req.body, null, 2));
      const response = await client.chat.postMessage({
        channel: body?.event?.channel || '',
        text: 'Please standby...',
      });
      const { ts, channel } = response;
      res.send();
      await sendMsg(ts, channel, body.event.text);
      return;
    }
    return res.status(200).json({
      text: 'Hello, world.',
    });
  }
  return res.status(200).json({
    challenge,
  });
});

export default router;
