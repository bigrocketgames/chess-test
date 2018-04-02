import { UPDATE_MESSAGE_SUCCESS, RESET_MESSAGE_STATE } from './actions';

const initialState = "Please select a piece to move."

export default(state = initialState, action) => {
  switch(action.type) {
    case UPDATE_MESSAGE_SUCCESS:
      return action.message;
      
    case RESET_MESSAGE_STATE:
      return initialState;

    default:
      return state;
  }
}