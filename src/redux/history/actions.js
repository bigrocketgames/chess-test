export const ADD_HISTORY_SUCCESS = 'ADD_HISTORY_SUCCESS';
export const RESET_HISTORY_SUCCESS = 'RESET_HISTORY_SUCCESS';

export const addHistorySuccess = (history) => {
  return({
    type: ADD_HISTORY_SUCCESS,
    history
  })
}

export function resetHistory() {
  return({
    type: RESET_HISTORY_SUCCESS
  })
}