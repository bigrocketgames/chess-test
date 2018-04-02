export const canPieceMoveToNewCell = (piece, currentCell, newCell) => {
  switch(piece) {
    case "Bishop":
      // implement logic to check if valid move
      if (validBishopMove(currentCell, newCell)) {
        return isBishopBlocked(currentCell, newCell);
      }
      return false;

    case "Knight":
      // implement logic to check if valid move
      return true;

    default:
      return false
  }
}

const validBishopMove = (currentCell, newCell) => {
  return Math.abs(currentCell.row - newCell.row) === Math.abs(currentCell.cell - newCell.cell);
}

const validKnightMove = (currentCell, newCell) => {
  
}

const isBishopBlocked = (currentCell, newCell) => {
  
}