import { SlackEventPayload } from '@/types/slack';
import axios from 'axios';
import express from 'express';
// import { hrBotController } from '@/controllers/hrBot.controller';

const router = express.Router();

router.route('/').post(async (req, res, next) => {
  const challenge = req.body?.challenge || '';
  // const type = req.body?.type;
  const body = req.body as SlackEventPayload;
  if (body.type === 'event_callback') {
    if (body?.event?.type === 'app_mention') {
      console.log(JSON.stringify(req.body, null, 2));
      await axios.post(
        'https://slack.com/api/chat.postMessage',
        {
          channel: body?.event?.channel || '',
          text: 'Hello world :tada:',
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
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
