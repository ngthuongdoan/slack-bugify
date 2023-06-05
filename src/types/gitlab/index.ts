export interface GitlabResponse {
  object_kind: string;
  event_type: string;
  user: User;
  project: Project;
  object_attributes: ObjectAttributes;
  labels: any[];
  changes: Changes;
  repository: Repository;
  assignees: User[];
}

export interface User {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
  email: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  web_url: string;
  avatar_url: any;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  ci_config_path: string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
}

export interface ObjectAttributes {
  assignee_id: number;
  author_id: number;
  created_at: string;
  description: string;
  head_pipeline_id: any;
  id: number;
  iid: number;
  last_edited_at: any;
  last_edited_by_id: any;
  merge_commit_sha: any;
  merge_error: any;
  merge_params: MergeParams;
  merge_status: string;
  merge_user_id: any;
  merge_when_pipeline_succeeds: boolean;
  milestone_id: any;
  source_branch: string;
  source_project_id: number;
  state_id: number;
  target_branch: string;
  target_project_id: number;
  time_estimate: number;
  title: string;
  updated_at: string;
  updated_by_id: any;
  url: string;
  source: Source;
  target: Target;
  last_commit: LastCommit;
  work_in_progress: boolean;
  total_time_spent: number;
  time_change: number;
  human_total_time_spent: any;
  human_time_change: any;
  human_time_estimate: any;
  assignee_ids: number[];
  labels: any[];
  state: string;
  blocking_discussions_resolved: boolean;
  action: 'open' | 'close' | 'reopen' | 'update' | 'merge';
}

export interface MergeParams {
  force_remove_source_branch: string;
}

export interface Source {
  id: number;
  name: string;
  description: string;
  web_url: string;
  avatar_url: any;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  ci_config_path: string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
}

export interface Target {
  id: number;
  name: string;
  description: string;
  web_url: string;
  avatar_url: any;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  ci_config_path: string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
}

export interface LastCommit {
  id: string;
  message: string;
  title: string;
  timestamp: string;
  url: string;
  author: Author;
}

export interface Author {
  name: string;
  email: string;
}

export interface Changes {
  merge_status: MergeStatus;
}

export interface MergeStatus {
  previous: string;
  current: string;
}

export interface Repository {
  name: string;
  url: string;
  description: string;
  homepage: string;
}

export type FullProduct = 'discover' | 'together' | 'marrybaby' | 'components' | 'user-profile' | 'care';

export type SupportedProduct = Partial<FullProduct>;

export interface DeployResponse {
  object_kind: string;
  ref: string;
  tag: boolean;
  before_sha: string;
  sha: string;
  build_id: number;
  build_name: string;
  build_stage: string;
  build_status: string;
  build_created_at: string;
  build_started_at: string;
  build_finished_at: string;
  build_duration: number;
  build_queued_duration: number;
  build_allow_failure: boolean;
  build_failure_reason: string;
  pipeline_id: number;
  runner: Runner;
  project_id: number;
  project_name: string;
  user: User;
  commit: Commit;
  repository: Repository;
  environment: any;
}

export interface Runner {
  id: number;
  description: string;
  runner_type: string;
  active: boolean;
  is_shared: boolean;
  tags: string[];
}

export interface Commit {
  id: number;
  sha: string;
  message: string;
  author_name: string;
  author_email: string;
  author_url: string;
  status: string;
  duration: any;
  started_at: string;
  finished_at: any;
}

export interface Repository {
  name: string;
  url: string;
  description: string;
  homepage: string;
  git_http_url: string;
  git_ssh_url: string;
  visibility_level: number;
}

export type GitlabAPICommit = {
  "id": string
  "short_id": string
  "created_at": string // "2023-04-28T10:16:48.000+07:00",
  "parent_ids": string[]
  "title": string
  "message": string
  "author_name": string
  "author_email": string
  "authored_date": string // "2023-04-28T10:16:48.000+07:00",
  "committer_name": string
  "committer_email": string
  "committed_date": string // "2023-04-28T10:16:48.000+07:00",
  "trailers": {},
  "web_url": string
}
export type GitlabAPITag = {
  "name": string
  "message": string
  "target": string
  "commit": GitlabAPICommit,
  "release": null,
  "protected": boolean
}
export type GitlabAPICompareRes = {
  "commit": GitlabAPICommit
  "commits": GitlabAPICommit[]
  "diffs": {
    "old_path": string
    "new_path": string
    "a_mode": string | null
    "b_mode": string | null
    "diff": string
    "new_file": boolean
    "renamed_file": boolean
    "deleted_file": boolean
  }[]
  "compare_timeout": boolean,
  "compare_same_ref": boolean,
  "web_url": string
}
