export const UPDATE_MESSAGE_SUCCESS = "UPDATE_MESSAGE_SUCCESS";
export const RESET_MESSAGE_STATE = "RESET_MESSAGE_STATE";

export const updateMessageSuccess = (message) => {
  return {
    type: UPDATE_MESSAGE_SUCCESS,
    message
  }
}

export function resetMessageState(){
  return {
    type: RESET_MESSAGE_STATE
  }
}

