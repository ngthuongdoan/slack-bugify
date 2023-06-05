import express from 'express';
import { hrBotController } from '@/controllers/hrBot.controller';

const router = express.Router();

router.route('/').get(hrBotController.welcome).post(hrBotController.handleMessage);

export default router;
