import { JIRA_DOMAIN } from '@/config/constant';

const jiraTicketRegex = /([A-Z]+-[0-9]+)/g;
export const getJiraLink = (link = '') => {
  const jiraTicketIds = link.match(jiraTicketRegex);
  return {
    id: jiraTicketIds?.[0] || '',
    url: `${JIRA_DOMAIN}/${jiraTicketIds?.[0] || ''}`,
  };
};
