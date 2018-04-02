import { ADD_HISTORY_SUCCESS } from './actions';

export default (state = [], action) => {
  switch(action.type) {
    case ADD_HISTORY_SUCCESS:
      const id = state.length + 1;
      const updatedHistory = {...action.history, id}
      return [
        ...state,
        updatedHistory
      ]

    default:
      return state;
  }
}