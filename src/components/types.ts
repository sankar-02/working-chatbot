import * as constant from './constants/constant';

interface Message {
  id: number;
  message: string;
  sender: typeof constant.user | typeof constant.bot;
  fileURL?: string;
}

interface State {
  showDialog: boolean;
  messages: Message[];
  inputValue: string;
}

enum ActionType {
  SET_MESSAGES = 'SET_MESSAGES',
  SET_INPUT_VALUE = 'SET_INPUT_VALUE',
  TOGGLE_DIALOG = 'TOGGLE_DIALOG',
}

type Action =
  | { type: ActionType.SET_MESSAGES; payload: Message[] }
  | { type: ActionType.SET_INPUT_VALUE; payload: string }
  | { type: ActionType.TOGGLE_DIALOG };

export { Message, State, Action, ActionType };
