import { UPDATE_MESSAGE_SUCCESS } from './actions';

const initialState = "Please select a piece to move."

export default(state = initialState, action) => {
  switch(action.type) {
    case UPDATE_MESSAGE_SUCCESS:
      return action.message;
      
    default:
      return state;
  }
}