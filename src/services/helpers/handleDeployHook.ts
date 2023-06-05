import axios from 'axios';
import flatten from 'lodash/flatten';

import { DEPLOYMENT_WEBHOOK, END_BUILD_NAME, START_BUILD_NAME } from '@/config/constant';
import { DeployResponse, FullProduct, GitlabAPICommit, GitlabAPICompareRes, GitlabAPITag } from '@/types/gitlab';

import { uuidv4 } from './uuidv4';
import { getIcon } from './getIcon';
import { ENV } from '@/utils/config';

async function getCommitsDiff(projectId: string, startId: string, endId: string): Promise<GitlabAPICommit[]> {
  const HHG_COMPARE_API = `https://gitlab.hellohealthgroup.com/api/v4/projects/${projectId}/repository/compare?from=${endId}&to=${startId}`

  const token = ENV.token;
  const headers = {
    'PRIVATE-TOKEN': token,
  }
  const res = await axios.get<GitlabAPICompareRes>(HHG_COMPARE_API, {
    headers,
  });

  return res.data?.commits || []
}

export const getCommitsMessages = async ({
  projectId,
  currentCommitId
}: {
  projectId: number
  currentCommitId: string
}): Promise<string[]> => {
  const HHG_TAGS_API = `https://gitlab.hellohealthgroup.com/api/v4/projects/${projectId}/repository/tags`;

  const token = ENV.token;
  const headers = {
    'PRIVATE-TOKEN': token,
  }

  const allTagsRes = await axios.get<GitlabAPITag[]>(HHG_TAGS_API, {
    headers,
    params: {
      per_page: 100,
      page: 1,
    }
  });
  const lastTagHash = allTagsRes.data.sort((a, b) => new Date(b.commit.created_at).getTime() - new Date(a.commit.created_at).getTime())[0].commit.id
  if (!lastTagHash) return []
  console.log((
    await getCommitsDiff(projectId.toString(), currentCommitId, lastTagHash)
  )?.filter?.(c => !c.title.startsWith('Merge branch') && !c.title.startsWith('Merge remote')).map(c => c.title) || [])
  return (
    await getCommitsDiff(projectId.toString(), currentCommitId, lastTagHash)
  )?.filter?.(c => !c.title.startsWith('Merge branch') && !c.title.startsWith('Merge remote')).map(c => c.title) || []
}

export const handleDeployHook = async (response: DeployResponse, template: FullProduct) => {
  let cardContent = null;
  const environment = response.ref || '';
  const projectName = response.repository.name || '';
  let commitMessages: string[] = []
  try {
    commitMessages = await getCommitsMessages({ projectId: response.project_id, currentCommitId: response.commit.sha })
  } catch (e) {
    console.log('getCommitsMessages error', e)
  }
  if (response.build_status === 'running' && flatten(Object.values(START_BUILD_NAME)).includes(response.build_name)) {
    // send deploy message
    cardContent = {
      cardsV2: [
        {
          cardId: uuidv4(),
          card: {
            header: {
              title: `PROJECT: ${projectName}`,
              subtitle: 'Deploying...',
              imageUrl: getIcon(template),
              imageType: 'CIRCLE',
              imageAltText: 'Avatar for Bot',
            },
            sections: [
              {
                widgets: [
                  {
                    decoratedText: {
                      topLabel: 'Environment',
                      text: environment === 'hotfixes' ? 'HOTFIXES' : 'STAGING',
                      startIcon: {
                        knownIcon: 'HOTEL_ROOM_TYPE',
                      },
                    },
                  },
                  ...(
                    commitMessages?.length ? [{
                      decoratedText: {
                        topLabel: 'Changes',
                        text: Array.from(new Set(commitMessages.map(c => '- ' + c))).join(' <br> '),
                        startIcon: {
                          knownIcon: 'DESCRIPTION',
                        },
                      },
                    }] : []
                  ),
                ],
              },
            ],
          },
        },
      ],
    };
  } else if (response.build_status === 'running' && flatten(Object.values(END_BUILD_NAME)).includes(response.build_name)) {
    // send deploy message
    cardContent = {
      cardsV2: [
        {
          cardId: uuidv4(),
          card: {
            header: {
              title: `PROJECT: ${projectName}`,
              subtitle: 'Deploy DONE',
              imageUrl: getIcon(template),
              imageType: 'CIRCLE',
              imageAltText: 'Avatar for Bot',
            },
            sections: [
              {
                widgets: [
                  {
                    decoratedText: {
                      topLabel: 'Environment',
                      text: environment === 'hotfixes' ? 'HOTFIXES' : 'STAGING',
                      startIcon: {
                        knownIcon: 'HOTEL_ROOM_TYPE',
                      },
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    };
  }

  try {
    const response = await axios.post(DEPLOYMENT_WEBHOOK, cardContent, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data);
  } catch (error: any) {
    throw error;
    // console.log({ error, message: error?.message || '' })
  }
};
