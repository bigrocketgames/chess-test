import { updateBoard, horizontalCheck, verticalCheck, diagonalCheck, knightCheck } from './checkForCheck';

export const canBlockCheck = (board, turnColor, pieceToMove, cell) => {
  const underAttackColor = (turnColor === "White") ? "Black" : "White";
  const updatedBoard = updateBoard(board, pieceToMove, cell);
  const attackingPiece = updatedBoard.find(function(e) {
    return (e.row === cell.row && e.cell === cell.cell)
  })
  const kingUnderAttack = updatedBoard.find(function(e) {
    return (e.piece === "King" && e.pieceColor === underAttackColor)
  })

  if (horizontalCheck(updatedBoard, attackingPiece, underAttackColor) || verticalCheck(updatedBoard, attackingPiece, underAttackColor) || diagonalCheck(updatedBoard, attackingPiece, underAttackColor) || knightCheck(updatedBoard, attackingPiece, underAttackColor)) {
    return true
  }

  return false
}



const getSpace = (board, row, cell) => {
  
}