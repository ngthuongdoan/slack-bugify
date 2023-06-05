import express from 'express';
import { botController } from '@/controllers/bot.controller';
import { getAllProjectsCommits, getAllProjectsMR, getFEUserEvents } from '@/services/helpers/gitlabStatistics';

const router = express.Router();

router.route('/').get(botController.welcome);
router.route('/all-mrs').get(async (req, res) => {
  res
    .status(200)
    .json(await getAllProjectsMR())
    .end();
});
router.route('/all-commits').get(async (req, res) => {
  res
    .status(200)
    .json(await getAllProjectsCommits())
    .end();
});
router.route('/fe-events').get(async (req, res) => {
  res.status(200).json(await getFEUserEvents()).end()
});
router.route('/:template').post(botController.handleWebhook);
router.route('/status/:projectId/:mergeRequestIid').get(botController.checkTicketStatus);
router.route('/resend/:template/:spaceId/:messageId/:threadId?').get(botController.resendTicket);

export default router;
