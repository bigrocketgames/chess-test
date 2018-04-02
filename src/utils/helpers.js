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
      return validKnightMove(currentCell, newCell);

    default:
      return false
  }
}

const validBishopMove = (currentCell, newCell) => {
  return Math.abs(currentCell.row - newCell.row) === Math.abs(currentCell.cell - newCell.cell);
}

const validKnightMove = (currentCell, newCell) => {
  // if the move is up 2 rows then verify that it only is 1 cell in either direction.
  if (Math.abs(currentCell.row - newCell.row) === 2) {
    return Math.abs(currentCell.cell - newCell.cell) === 1

  // if the move is up 1 row then verify that is only is 2 cells in either direction.
  } else if (Math.abs(currentCell.row - newCell.row) === 1) {
    return Math.abs(currentCell.cell - newCell.cell) === 2
  }

  // if the move is not up 1 or 2 then return false to indicate the move is not valid.
  return false
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

      // check if next cell is currently occupied and return true if it is occupied to indicate that the bishop is blocked from moving past
      if (checkCell.value !== "") {
        return true
      }
    }
  }

  // if the bishop is not blocked return false
  return false
}