export const canPieceMoveToNewCell = (piece, currentCell, newCell) => {
  switch(piece) {
    case "bishop":
      // implement logic to check if valid move
      return true;

    case "knight":
      // implement logic to check if valid move
      return true;

    default:
      return false
  }
}