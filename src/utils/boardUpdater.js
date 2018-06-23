export const updateBoard = (board, pieceToMove, cell) => {
  // copying board array so as not to modify the original
  let boardToUpdate = JSON.parse(JSON.stringify(board))

  // update the copy of the board to proposed move
  boardToUpdate[cell.id-1].piece =  pieceToMove.piece
  boardToUpdate[cell.id-1].pieceColor = pieceToMove.pieceColor
  boardToUpdate[cell.id-1].value = pieceToMove.value
  boardToUpdate[pieceToMove.id-1].piece = ""
  boardToUpdate[pieceToMove.id-1].pieceColor = ""
  boardToUpdate[pieceToMove.id-1].value = ""

  return boardToUpdate
}