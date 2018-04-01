import { UPDATE_MESSAGE_SUCCESS } from './actions';

export default(state = "", action) => {
  switch(action.type) {
    case UPDATE_MESSAGE_SUCCESS:
      return action.message;
      
    default:
      return state;
  }
}