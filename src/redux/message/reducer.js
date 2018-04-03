import { UPDATE_MESSAGE_SUCCESS, RESET_MESSAGE_STATE } from './actions';

const initialState = "White goes first."

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