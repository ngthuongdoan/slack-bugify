// import inquirer from "inquirer"
import axios from 'axios';
import dayjs from 'dayjs';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';

import { MAPPED_GITLAB_WITH_CHAT, MAPPED_WEBHOOK, PRODUCT_ALLOW_LIST, TESTER_BY_PROJECT } from '@/config/constant';
import { FullProduct, GitlabResponse } from '@/types/gitlab';
import { generateButtonColor } from './generateButtonColor';
import { getJiraLink } from './getJiraLink';
import { getThreadId } from './getThreadId';
import { uuidv4 } from './uuidv4';
import { ENV } from '@/utils/config';
import { getIcon } from './getIcon';

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
export const sendMessageToGoogleChat = async (gitlabResponse: GitlabResponse, template: FullProduct) => {
  if (!template || !PRODUCT_ALLOW_LIST.includes(template)) throw new Error('Non-Supported Product');
  // const quoteInstance = await getQuote()
  // let quoteText: string = ""
  // if (quoteInstance && quoteInstance.length > 0)
  // 	quoteText = `<i>${quoteInstance[0].quote}</i> - <b>${quoteInstance[0].author}</b>`
  // const answers = await inquirer.prompt([
  // 	{
  // 		type: "input",
  // 		name: "message",
  // 		message: "Message (Optional): ",
  // 		default: "Dear",
  // 	},
  // ])
  const token = ENV.token;

  const commitMessage = gitlabResponse.object_attributes.title;
  const assigneeName = gitlabResponse.assignees?.[0]?.name;
  const projectId = gitlabResponse.project.id;
  const projectName = gitlabResponse.project.name;
  const url = gitlabResponse.object_attributes.url;
  const mergeRequestId = gitlabResponse.object_attributes.iid;
  const sourceBranch = gitlabResponse.object_attributes.source_branch;
  const targetBranch = gitlabResponse.object_attributes.target_branch;

  if (gitlabResponse.labels.includes('DO NOT MERGE') || gitlabResponse.object_attributes.title.includes('Draft')) return;
  const mergeRequestResponse = await axios.get(
    `https://gitlab.hellohealthgroup.com/api/v4/projects/${projectId}/merge_requests/${mergeRequestId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'PRIVATE-TOKEN': token,
      },
    }
  );
  const reviewerName = mergeRequestResponse.data.reviewers?.[0]?.name;
  const reviewerUsername = mergeRequestResponse.data.reviewers?.[0]?.username;
  const { id: ticketId, url: jiraLink } = getJiraLink(commitMessage);

  const mentionText = {
    text: `${MAPPED_GITLAB_WITH_CHAT[reviewerUsername] || ''} ${
      ticketId && jiraLink ? TESTER_BY_PROJECT[template] || '' : ''
    }`,
  };

  let messageId = '';
  let spaceId = '';
  let threadId = getThreadId() || '';
  try {
    const responseForText = await axios.post(MAPPED_WEBHOOK[template] + `&threadKey=${threadId}`, mentionText, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const regexForMessageId = /[^\/]+(?=\.)/;
    const _match = responseForText?.data?.name?.match(regexForMessageId);
    messageId = _match?.[0] || '';
    const regexForSpaceId = /spaces\/(\w+)\//;
    const match = responseForText?.data?.name?.match(regexForSpaceId);
    spaceId = match?.[1] || '';
  } catch (error) {
    throw error;
  }

  const cardContent = {
    cardsV2: [
      {
        cardId: uuidv4(),
        card: {
          header: {
            title: `Merge Request (${projectName})`,
            imageUrl: getIcon(template),
            imageType: 'CIRCLE',
            imageAltText: 'Avatar for Bot',
          },
          sections: [
            {
              collapsible: true,
              uncollapsibleWidgetsCount: 3,
              widgets: [
                {
                  decoratedText: {
                    topLabel: 'Title',
                    text: commitMessage,
                    wrapText: true,
                    startIcon: {
                      knownIcon: 'BOOKMARK',
                    },
                  },
                },
                {
                  decoratedText: {
                    topLabel: 'Environment',
                    text: `Merge "${sourceBranch}" into "${targetBranch}"`,
                    startIcon: {
                      knownIcon: 'HOTEL_ROOM_TYPE',
                    },
                  },
                },
                ...(assigneeName
                  ? [
                      {
                        decoratedText: {
                          topLabel: 'Created by',
                          text: assigneeName,
                          startIcon: {
                            knownIcon: 'PERSON',
                          },
                        },
                      },
                    ]
                  : []),
                ...(reviewerName
                  ? [
                      {
                        decoratedText: {
                          topLabel: 'Reviewer',
                          text: reviewerName,
                          startIcon: {
                            knownIcon: 'PERSON',
                          },
                        },
                      },
                    ]
                  : []),
                ...(ticketId
                  ? [
                      {
                        decoratedText: {
                          topLabel: 'Ticket:',
                          text: `${ticketId.toUpperCase()}`,
                          startIcon: {
                            knownIcon: 'CONFIRMATION_NUMBER_ICON',
                          },
                        },
                      },
                    ]
                  : []),
              ],
            },
            {
              widgets: [
                {
                  buttonList: {
                    buttons: [
                      {
                        text: 'View Merge Request',
                        onClick: {
                          openLink: {
                            url,
                          },
                        },
                        color: generateButtonColor(template),
                      },

                      ...(ticketId && jiraLink
                        ? [
                            {
                              text: 'View JIRA Ticket',
                              onClick: {
                                openLink: {
                                  url: jiraLink,
                                },
                              },
                              color: {
                                red: 121,
                                green: 121,
                                blue: 121,
                                alpha: 1,
                              },
                            },
                          ]
                        : []),
                      {
                        text: 'Get Status',
                        onClick: {
                          openLink: {
                            openAs: 'OVERLAY',
                            url: `https://internal-tool.hellohealthgroup.com/api/v1/bot/status/${projectId}/${mergeRequestId}`,
                          },
                        },
                      },
                      {
                        text: 'Resend',
                        icon: {
                          knownIcon: 'FLIGHT_DEPARTURE',
                        },
                        onClick: {
                          openLink: {
                            url: `https://internal-tool.hellohealthgroup.com/api/v1/bot/resend/${template}/${spaceId}/${messageId}/${
                              template === 'together' ? threadId : ''
                            }`,
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      },
    ],
  };

  try {
    const response = await axios.post(MAPPED_WEBHOOK[template] + `&threadKey=${getThreadId()}`, cardContent, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data);
  } catch (error: any) {
    throw error;
  }
};
