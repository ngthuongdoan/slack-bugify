import { WEBHOOK_DEV } from '@/config/constant';
import { GitlabResponse } from '@/types/gitlab';
import axios from 'axios';

export async function debugBot(event: GitlabResponse['object_attributes']['action'] | 'error' | 'deploy', body?: string) {
  try {
    const chatBotHook = WEBHOOK_DEV;
    const response = await axios.post(
      chatBotHook,
      {
        body: JSON.stringify({
          text: `Gitlab event\n\n\`EVENT: ${event}\`\n\n${body}`,
        }),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log('🚀 ---------------------------------------------------🚀');
    console.log('🚀 ~ file: debugBot.ts:24 ~ debugBot ~ error:', error);
    console.log('🚀 ---------------------------------------------------🚀');
    console.log('🚀 ------------------------------------------------🚀');
    console.log('🚀 ~ file: debugBot.ts:6 ~ debugBot ~ body:', body);
    console.log('🚀 ------------------------------------------------🚀');
  }
}
