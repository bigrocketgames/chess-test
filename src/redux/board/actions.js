export const MOVE_SUCCESS = 'MOVE_SUCCESS';
export const RESET_BOARD_SUCCESS = 'RESET_BOARD_SUCCESS';
export const REWIND_BOARD_SUCCESS = 'REWIND_BOARD_SUCCESS';
export const UPDATE_CASTLING = 'UPDATE_CASTLING';

export const moveSuccess = (board, enPassant) => {
  return({
    type: MOVE_SUCCESS,
    board,
    enPassant
  })
}

export const updateCastling = (castling) => {
  return ({
    type: UPDATE_CASTLING,
    castling
  })
}

export const rewindBoard = (board) => {
  return({
    type: REWIND_BOARD_SUCCESS,
    board
  })
}

export function resetBoard(){
  return({
    type: RESET_BOARD_SUCCESS
  })
}