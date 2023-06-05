import { hrBotService } from '@/services/hrBot.service';
import { ChatApi, Sender } from '@/types/chat';
import catchAsync from '@/utils/catchAsync';

import httpStatus from 'http-status';

const welcome = catchAsync(async (req, res) => {
  res.status(Number(httpStatus.OK)).send('<h1>Welcome to Cu Tin</h1>');
});

const handleMessage = catchAsync(async (req, res) => {
  try {
    return await hrBotService.handleMessage(req, res);
  } catch (e: any) {
    return hrBotService.debugBot('error', e?.message ? e.message : String(e));
  } finally {
    res.status(200).end();
  }
});

export const hrBotController = {
  welcome,
  handleMessage,
};
