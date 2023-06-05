import { Sender } from '@/types/chat';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
export const normalMessage = (req: Request, res: Response) => {
  const message = req.body.message?.argumentText.trim();
  const time = new Date();
  const sender = req.body.message?.sender as Sender;

  const botMessage = `Hello <${sender?.name}>, you sent \`${message}\` at ${dayjs(time)
    .tz('Asia/Ho_Chi_Minh')
    .format('DD/MM/YYYY HH:mm:ss')}`;

  return res.json({
    text: botMessage,
  });
};
