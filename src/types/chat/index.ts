export interface ChatApi {
  type: EventType;
  eventTime: string;
  message: Message;
  user: User;
  space: Space;
  configCompleteRedirectUrl: string;
  common: Common;
  isDialogEvent: boolean;
  dialogEventType: DialogEventType;
}

export type DialogEventType =
  | 'TYPE_UNSPECIFIED' //This could be used when the corresponding event is not dialog related. For example an @mention.
  | 'REQUEST_DIALOG' //Any user action that opens a dialog.
  | 'SUBMIT_DIALOG' //A card click event from a dialog.
  | 'CANCEL_DIALOG';

export type EventType =
  | 'MESSAGE' //A message was sent in a space.
  | 'ADDED_TO_SPACE' //The Chat app was added to a space by a Chat user or Workspace administrator.
  | 'REMOVED_FROM_SPACE' //The Chat app was removed from a space by a Chat user or Workspace administrator.
  | 'CARD_CLICKED'; //	The Chat app's interactive card was clicked

export interface Message {
  name: string;
  sender: Sender;
  createTime: string;
  text: string;
  annotations: Annotation[];
  thread: Thread;
  space: Space;
  argumentText: string;
  slashCommand?: SlashCommand;
  retentionSettings: RetentionSettings;
  messageHistoryState: string;
}

export interface Sender {
  name: string;
  displayName: string;
  avatarUrl: string;
  email: string;
  type: string;
  domainId: string;
}

export interface Annotation {
  type: string;
  startIndex: number;
  length: number;
  slashCommand?: SlashCommand;
  userMention?: UserMention;
}

export interface SlashCommand {
  bot: Bot;
  type: string;
  commandName: string;
  commandId: number;
}

export interface Bot {
  name: string;
  displayName: string;
  avatarUrl: string;
  type: string;
}

export interface UserMention {
  user: User;
  type: string;
}

export interface User {
  name: string;
  displayName: string;
  avatarUrl: string;
  email: string;
  type: string;
  domainId: string;
}

export interface Thread {
  name: string;
  retentionSettings: RetentionSettings;
}

export interface RetentionSettings {
  state: string;
}

export interface Space {
  name: string;
  type: string;
  displayName: string;
  spaceThreadingState: string;
  spaceType: string;
  spaceHistoryState: string;
  retentionSettings: RetentionSettings;
}

export interface Common {
  userLocale: string;
  hostApp: string;
  // Represents user data entered in a dialog
  formInputs: {
    // Represents string data entered in a dialog, like text input fields
    // and check boxes
    [name: string]: {
      stringInputs: {
        // An array of strings entered by the user in a dialog.
        value: string[];
      };
    };
  };
  parameters: {
    string: string;
  };
  invokedFunction: string;
}
