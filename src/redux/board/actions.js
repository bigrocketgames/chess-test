export const MOVE_SUCCESS = 'MOVE_SUCCESS';

export const moveSuccess = (piece, oldCell, newCell) => {
  return({
    type: MOVE_SUCCESS,
    piece,
    oldCell,
    newCell
  })
}