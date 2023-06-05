import { GitlabAPICommit } from "@/types/gitlab";
import { GitlabAPIUserEvent } from "@/types/gitlab/events";
import { GitlabAPIMergeRequest } from "@/types/gitlab/mergeRequest";
import { GitlabAPIProject } from "@/types/gitlab/project";
import { ENV } from "@/utils/config";
import axios, { AxiosRequestConfig } from "axios";
import { Method } from "axios";

export const ApiLinkProjects = `https://gitlab.hellohealthgroup.com/api/v4/projects`;
export const ApiLinkAllMR = `https://gitlab.hellohealthgroup.com/api/v4/merge_requests`;
export const getApiLinkProjectCommits = (projectId: number) => `https://gitlab.hellohealthgroup.com/api/v4/projects/${projectId}/repository/commits`;
export const getApiLinkProjectMR = (projectId: number) => `https://gitlab.hellohealthgroup.com/api/v4/projects/${projectId}/merge_requests`;
export const getApiLinkUserEvents = (userId: number) => `https://gitlab.hellohealthgroup.com/api/v4//users/${userId}/events`;

export const callGitlabApi = <T>(link: string, method?: Method | string, additionalConfig?: AxiosRequestConfig) => {
  const token = ENV.token;
  const headers = {
    'PRIVATE-TOKEN': token,
    ...additionalConfig.headers
  }
  return axios<T>({
    ...additionalConfig,
    url: link,
    headers,
    method
  });
}
export const getAllProjects = async (max = 500) => {
  let res: GitlabAPIProject[] = [];
  let page = 1
  try {
    while (true) {
      const allProjects = await callGitlabApi<GitlabAPIProject[]>(ApiLinkProjects, 'GET', {
        params: {
          per_page: 100,
          page,
        }
      });
      res = res.concat(allProjects.data);
      if (allProjects.data.length < 100 ||
        allProjects.data.length >= max) {
        break
      }
      page++
    }
  } catch (e) {
    console.log('error getAllProjects', e)
  }
  return res
}
export const getProjectCommits = async (projectId: number, max = 2000) => {
  const commitApiLink = getApiLinkProjectCommits(projectId);
  let res: GitlabAPICommit[] = [];
  let page = 1
  try {
    while (true) {
      const allProjects = await callGitlabApi<GitlabAPICommit[]>(commitApiLink, 'GET', {
        params: {
          per_page: 100,
          page,
          // current date - 3 month
          since: new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString()
        }
      });
      res = res.concat(allProjects.data);
      if (allProjects.data.length < 100 || res.length >= max) {
        break
      }
      page++
    }
  } catch (e) {
    // console.log('error getProjectCommits', e)
  }
  return res
}
export const getAllProjectsCommits = async () => {
  const allProjects = await getAllProjects();
  const allCommits = await Promise.all(allProjects.map((project) => getProjectCommits(project.id)))
  // console.log('>>>>', new Set(allCommits.flat().map(r => (r.author_name))))
  return allCommits.flat()
}

export const getAllProjectsMR = async () => {
  const allProjects = await getAllProjects();
  const allMR = await Promise.all(allProjects.map((project) => getProjectMR(project.id)))
  // const allMRObject: Record<string, User> = allMR.flat().reduce((r, mr) => {
  //   return {
  //     ...r,
  //     [mr.author.id]: mr.author
  //   }
  // }, {})
  // console.log('>>>>', Object.keys(allMRObject).map((k) => ({
  //   id: allMRObject[k].id,
  //   name: allMRObject[k].name,
  //   username: allMRObject[k].username
  // })))
  return allMR.flat()
}
export const getProjectMR = async (projectId: number, max = 1000) => {
  let res: GitlabAPIMergeRequest[] = [];
  let page = 1
  try {
    while (true) {
      const allProjects = await callGitlabApi<GitlabAPIMergeRequest[]>(getApiLinkProjectMR(projectId), 'GET', {
        params: {
          per_page: 100,
          page,
          state: 'all',
          // current date - 3 month
          created_after: new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString()
        }
      });
      res = res.concat(allProjects.data);
      if (allProjects.data.length < 100 || res.length >= max) {
        break
      }
      page++
    }
  } catch (e) {
    console.log('error getProjectMR', e)
  }
  return res
}

export const getUserEvents = async (userId: number, max = 1000) => {
  let res: GitlabAPIUserEvent[] = [];
  let page = 1
  try {
    while (true) {
      const allProjects = await callGitlabApi<GitlabAPIUserEvent[]>(getApiLinkUserEvents(userId), 'GET', {
        params: {
          per_page: 100,
          page,
          // current date - 2 month
          // created_after: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString()
        }
      });
      res = res.concat(allProjects.data);
      if (allProjects.data.length < 100 || res.length >= max) {
        break
      }
      page++
    }
  } catch (e) {
    console.log('error getUserEvents', e)
  }
  return res
}

export const FrontendDevs = [
  {
    "id": 59,
    "username": "vu.le",
    "name": "Vu Le Hoang",
  },
  {
    "id": 58,
    "username": "nhan.nguyen",
    "name": "Nhan Nguyen Thien",
  },

  {
    "id": 54,
    "username": "phuong.le",
    "name": "Phuong Le Hoang Minh",
  },
  {
    "id": 47,
    "username": "thuong.doanngoc",
    "name": "Thuong “Eddie” Doan Ngoc",
  },
  {
    "id": 39,
    "username": "tung.vu",
    "name": "Tung Vu Manh",
  },
  {
    "id": 52,
    "username": "luc.tran",
    "name": "Luc Tran Cong",
  },
]
export const getFEUserEvents = () => {
  return Promise.all(FrontendDevs.map(async (dev) => {
    return {
      ...dev,
      events: await getUserEvents(dev.id)
    }
  }))
}