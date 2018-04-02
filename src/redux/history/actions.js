export const ADD_HISTORY_SUCCESS = 'ADD_HISTORY_SUCCESS';

export const addHistorySuccess = (piece, pieceColor, value, oldCell, newCell) => {
  return({
    type: ADD_HISTORY_SUCCESS,
    piece,
    pieceColor,
    value,
    oldCell,
    newCell
  })
}