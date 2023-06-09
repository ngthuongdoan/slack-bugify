import express from 'express';
// import { hrBotController } from '@/controllers/hrBot.controller';

const router = express.Router();

router.route('/').post((req, res, next) => {
  const challenge = req.body?.challenge || '';
  const type = req.body?.type;
  if (type === 'event_callback') {
    if (req.body?.event?.type === 'app_mention')
      res.status(200).json({
        text: 'Hello, world.',
      });
  }
  res.status(200).json({
    challenge,
  });
});

export default router;
