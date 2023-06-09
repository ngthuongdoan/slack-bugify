export interface SlackEvent {
  client_msg_id: string;
  type: string;
  text: string;
  user: string;
  ts: string;
  blocks: SlackBlock[];
  team: string;
  channel: string;
  event_ts: string;
}

export interface SlackBlock {
  type: string;
  block_id: string;
  elements: SlackBlockElement[];
}

export interface SlackBlockElement {
  type: string;
  user_id?: string;
  text?: string;
}

export interface SlackAuthorization {
  enterprise_id: string | null;
  team_id: string;
  user_id: string;
  is_bot: boolean;
  is_enterprise_install: boolean;
}

export interface SlackEventPayload {
  token: string;
  team_id: string;
  api_app_id: string;
  event: SlackEvent;
  type: string;
  event_id: string;
  event_time: number;
  authorizations: SlackAuthorization[];
  is_ext_shared_channel: boolean;
  event_context: string;
}
