export const ADD_HISTORY_SUCCESS = 'ADD_HISTORY_SUCCESS';

export const addHistorySuccess = (history) => {
  return({
    type: ADD_HISTORY_SUCCESS,
    history
  })
}