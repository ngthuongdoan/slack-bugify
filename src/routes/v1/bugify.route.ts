import express from 'express';
// import { hrBotController } from '@/controllers/hrBot.controller';

const router = express.Router();

router.route('/').post((req, res, next) => {
  const challenge = req.body?.challenge || '';
  res.status(200).json({
    challenge,
  });
});

export default router;
