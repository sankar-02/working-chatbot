import { Reducer } from 'react';
import { State, Action, ActionType } from './types';

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.SET_MESSAGES:
      return { ...state, messages: action.payload };
    case ActionType.SET_INPUT_VALUE:
      return { ...state, inputValue: action.payload };
    case ActionType.TOGGLE_DIALOG:
      return { ...state, showDialog: !state.showDialog };
    default:
      return state;
  }
};

export default reducer;
export { ActionType };
