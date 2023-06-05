import { MAPPED_WEBHOOK } from '@/config/constant';
import { FullProduct } from '@/types/gitlab';
import axios from 'axios';
import { getThreadId } from './getThreadId';
import dayjs from 'dayjs';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
export const resendMessage = async (spaceId: string, messageId: string, template: FullProduct, threadId: string = '') => {
  try {
    const thread = threadId ? threadId + '/' : '';
    const link = `https://chat.google.com/room/${spaceId}/${thread}${messageId}`;
    const resendText = { text: `Hey <users/109196398756093781275> you missed this 💩 \n${link}` };
    await axios.post(MAPPED_WEBHOOK[template] + `&threadKey=${getThreadId()}`, resendText, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw error;
  }
};
