export const canPieceMoveToNewCell = (piece, currentCell, newCell) => {
  switch(piece) {
    case "Bishop":
      // implement logic to check if valid move
      return true;

    case "Knight":
      // implement logic to check if valid move
      return true;

    default:
      return false
  }
}