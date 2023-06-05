import httpStatus from 'http-status';
import catchAsync from '@/utils/catchAsync';
import { DeployResponse, FullProduct, GitlabResponse } from '@/types/gitlab';
import { botService } from '@/services/bot.service';
import axios from 'axios';
import { ENV } from '@/utils/config';

const style = `<style>.status{
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  display: inline-block;
  text-transform: capitalize;s
}
.status[data-status="opened"]{
  background-color: #C3E6CD;
  color: #24663B;
}
.status[data-status="merged"]{
  background-color: #CAE2F9;
  color: #0C5CAC;
}
.status[data-status="closed"]{
  background-color: #FCD4CC;
  color: #AE1801;
}
</style>`;

const welcome = catchAsync(async (req, res) => {
  res.status(Number(httpStatus.OK)).send('<h1>Welcome to HHG Bot</h1>');
});

const handleWebhook = catchAsync(async (req, res) => {
  try {
    // check if request is from gitlab
    const template = (req.params?.template as FullProduct) || null;
    const gitlabEvent = req.headers['x-gitlab-event'];

    if (gitlabEvent) {
      const gitlabResponse = req.body as GitlabResponse;

      if (gitlabEvent === 'Merge Request Hook') {
        const mrAction = gitlabResponse.object_attributes.action;
        if (mrAction === 'open') {
          return await botService.sendMessageToGoogleChat(gitlabResponse, template);
        } else if (mrAction === 'close') {
          // return triggerBot('close')
        } else if (mrAction === 'merge') {
          // return triggerBot('merge')
        }
      } else if (gitlabEvent === 'Job Hook') {
        return botService.handleDeployHook(gitlabResponse as unknown as DeployResponse, template);
      }
    }
  } catch (e: any) {
    return botService.debugBot('error', e?.message ? e.message : String(e));
  }
  res.status(200).end();
});

const checkTicketStatus = catchAsync(async (req, res) => {
  try {
    const projectId = req?.params?.projectId;
    const mergeRequestIID = req?.params?.mergeRequestIid;

    if (!projectId || !mergeRequestIID) throw new Error('No params');

    const HHG_PROJECT_PATH = `https://gitlab.hellohealthgroup.com/api/v4/projects/${projectId}/merge_requests/${mergeRequestIID}`;
    const token = ENV.token;

    const response = await axios.get(HHG_PROJECT_PATH, {
      headers: {
        'PRIVATE-TOKEN': token,
      },
    });

    const status = response?.data?.state;
    res.status(httpStatus.OK).send(`${style}<div data-status="${status}" class="status">${status}</div>`);
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error });
  }
});

const resendTicket = catchAsync(async (req, res) => {
  try {
    const template = req?.params?.template as FullProduct;
    const spaceId = req?.params?.spaceId;
    const messageId = req?.params?.messageId;
    const threadId = req?.params?.threadId;

    if (!spaceId || !messageId || !template) throw new Error('No params');

    await botService.resendMessage(spaceId, messageId, template, threadId);
    // Send JavaScript code to the client that closes the window
    res.send('<script>window.close();</script>');
  } catch (e: any) {
    return botService.debugBot('error', e?.message ? e.message : String(e));
  } finally {
    res.status(200).end();
  }
});

export const botController = {
  welcome,
  handleWebhook,
  checkTicketStatus,
  resendTicket,
};
