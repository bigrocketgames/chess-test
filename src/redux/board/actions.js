export const MOVE_SUCCESS = 'MOVE_SUCCESS';
export const RESET_BOARD_SUCCESS = 'RESET_BOARD_SUCCESS';

export const moveSuccess = (piece, oldCell, newCell) => {
  return({
    type: MOVE_SUCCESS,
    piece,
    oldCell,
    newCell
  })
}

export function resetBoard(){
  return{
    type: RESET_BOARD_SUCCESS
  }
}