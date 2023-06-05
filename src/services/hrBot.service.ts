import { ChatApi } from '@/types/chat';
import { debugBot } from './helpers/debugBot';

import { Request, Response } from 'express';
import { normalMessage } from './hrBot/normalMessage';
import { wfhDialog } from './hrBot/wfhDialog';

const handleMessage = async (req: Request, res: Response) => {
  // check if request is from gitlab
  const body = req.body as ChatApi;
  const type = body.type;
  const isDialogEvent = Boolean(body.isDialogEvent);
  debugBot('error', body ? JSON.stringify(body, null, 2) : 'test');
  if (type === 'MESSAGE') {
    if (!isDialogEvent) {
      return normalMessage(req, res);
    } else {
      // open dialog
      return wfhDialog(req, res);
    }
  }

  // if (type === 'CARD_CLICKED') {
  //   if (dialogEventType === 'SUBMIT_DIALOG') {
  //     const auth = await googleService.getAuthToken();
  //     const botMessage = `Hello <${sender?.name}>, you sent \`${message}\` at ${dayjs(time)
  //       .tz('Asia/Ho_Chi_Minh')
  //       .format('DD/MM/YYYY HH:mm:ss')}`;

  //     await googleService.addSpreadSheetValues({
  //       spreadsheetId: '1HmqcoEKiEBQJeysmjiPcPFT3FDd36kkmm8Rs0W9UjpI',
  //       sheetName: 'Sheet1!A1',
  //       auth,
  //       values: [botMessage, botMessage + '2', botMessage + '3'],
  //     });
  //     return res.end();
  //   }
  // }
};
export const hrBotService = {
  debugBot,
  handleMessage,
};
