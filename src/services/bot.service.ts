import { sendMessageToGoogleChat } from './helpers/sendMessageToGoogleChat';
import { handleDeployHook } from './helpers/handleDeployHook';
import { debugBot } from './helpers/debugBot';
import { resendMessage } from './helpers/resendMessage';

export const botService = {
  sendMessageToGoogleChat,
  handleDeployHook,
  debugBot,
  resendMessage,
};
