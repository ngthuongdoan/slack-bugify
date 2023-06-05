import { User } from "."

export type GitlabAPIMergeRequest = {
  id: number
  iid: number
  project_id: number
  title: string
  description: string
  state: string
  created_at: string
  updated_at: string
  merged_by: User
  merge_user: User
  merged_at: string
  closed_by: User
  closed_at: string
  target_branch: string
  source_branch: string
  user_notes_count: number
  upvotes: number
  downvotes: number
  author: User
  assignees: User[]
  assignee: User
  reviewers: User[]
  source_project_id: number
  target_project_id: number
  labels: string[]
  draft: boolean
  work_in_progress: boolean
  milestone: any
  merge_when_pipeline_succeeds: boolean
  merge_status: string
  sha: string
  merge_commit_sha: string
  squash_commit_sha: string
  discussion_locked: any
  should_remove_source_branch: boolean
  force_remove_source_branch: boolean
  reference: string
  references: References
  web_url: string
  time_stats: TimeStats
  squash: boolean
  task_completion_status: TaskCompletionStatus
  has_conflicts: boolean
  blocking_discussions_resolved: boolean
  approvals_before_merge: any
}

export interface References {
  short: string
  relative: string
  full: string
}

export interface TimeStats {
  time_estimate: number
  total_time_spent: number
  human_time_estimate: any
  human_total_time_spent: any
}

export interface TaskCompletionStatus {
  count: number
  completed_count: number
}
