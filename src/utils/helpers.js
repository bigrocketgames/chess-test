export const canPieceMoveToNewCell = (board, piece, currentCell, newCell) => {
  switch(piece) {
    case "Bishop":
      // implement logic to check if valid move
      if (validBishopMove(currentCell, newCell)) {
        return !isBishopBlocked(board, currentCell, newCell);
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

const isBishopBlocked = (board, currentCell, newCell) => {
  
  const rowNum = currentCell.row - newCell.row
  const cellNum = currentCell.cell - newCell.cell
  let checkCell = null

  if (rowNum > 0) {
    for(let i = 1; i <= rowNum; i++) {
      if (cellNum > 0) {
        checkCell = board.find(function(e) {
          return ((e.row === currentCell.row - i) && (e.cell === currentCell.cell - i))
        }) 
      } else {
        checkCell = board.find(function(e) {
          return ((e.row === currentCell.row - i) && (e.cell === currentCell.cell + i))
        })
      }

      // check if next cell is currently occupied
      if (checkCell.value !== "") {
        return true
      }
    }
  } else {
    for(let i = -1; i >= rowNum; i--){
      if (cellNum > 0) {
        checkCell = board.find(function(e) {
          return ((e.row === currentCell.row - i) && (e.cell === currentCell.cell + i))
        }) 
      } else {
        checkCell = board.find(function(e) {
          return ((e.row === currentCell.row - i) && (e.cell === currentCell.cell - i))
        })
      }

      // check if next cell is currently occupied
      if (checkCell.value !== "") {
        return true
      }
    }
  }

  // if the bishop is not blocked return false
  return false
}