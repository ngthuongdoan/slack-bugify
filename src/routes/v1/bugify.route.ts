import { SlackEventPayload } from '@/types/slack';
import catchAsync from '@/utils/catchAsync';
import axios from 'axios';
import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
// const poeClient = new PoeClient({
//   logLevel: 'silent',
// });

// async function sendMsg(text: string) {
//   let response = '';

//   await poeClient.sendMessage(text.replace(/&lt;@U05BNEE76N4>/gi, '').trim(), 'bugify', true, (result) => {
//     response = result;
//   });
//   return response;
// }

// async function initPoe() {
//   await poeClient.init(true);
//   await poeClient.getNextData();
// }
const router = express.Router();
// function containsRequiredWords(str: string) {
//   const requiredWords = ['Title', 'Description', 'Expected', 'Actual', 'Resources'];
//   return requiredWords.every((word) => new RegExp(`\\b${word}\\b`).test(str));
// }
const configuration = new Configuration({
  organization: process.env.CHAT_ORGANIZATION,
  apiKey: process.env.CHAT_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').post(
  catchAsync(async (req, res) => {
    try {
      const challenge = req.body?.challenge || '';

      const body = req.body as SlackEventPayload;
      if (body.type === 'event_callback') {
        console.log(JSON.stringify(body, null, 2));
        if (body?.event?.type === 'app_mention') {
          const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'user',
                content: `Create and Bug Report Template with these headers: Title, Description, Expected, Actual, Resources about this ${body.event.text
                  .replace(/&lt;@U05BNEE76N4>/gi, '')
                  .trim()}`,
              },
            ],
          });
          const message = response.data.choices[0].message.content;
          console.log('🚀 -------------------------------------------------------------🚀');
          console.log('🚀 ~ file: bugify.route.ts:40 ~ catchAsync ~ message:', message);
          console.log('🚀 -------------------------------------------------------------🚀');
          if (message && message !== '') {
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
          }
          res.status(200).end();
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
