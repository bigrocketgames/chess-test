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

    case "Pawn":
      // returns true or false to confirm if move can be made or not
      if(!pawnCapture(currentCell, newCell)) {
        if(validPawnMove(currentCell, newCell)) {
          return !isPawnBlocked(board, currentCell, newCell)
        }
      } else {
        return true
      }
      return false;

    default:
      return false
  }
}

// check if any pieces are left of the captured color
export const gameWon = (board, capturedColor, newCell) => {
  const piecesLeft = board.findIndex(cell => (cell.pieceColor === capturedColor) && (cell.id !== newCell.id))
  
  if (piecesLeft === -1) {
    return true
  } else {
    return false
  }
}

const pawnCapture = (currentCell, newCell) => {
  // check for possible capture
  if (newCell.pieceColor !== currentCell.pieceColor && newCell.pieceColor !== "") {
    if (currentCell.pieceColor === "Black") {
      return (currentCell.row - newCell.row === -1) && Math.abs(currentCell.cell - newCell.cell) === 1
    } else {
      return (currentCell.row - newCell.row === 1) && Math.abs(currentCell.cell - newCell.cell) === 1
    }
  }
  return false
}

const validPawnMove = (currentCell, newCell) => {
  if (currentCell.pieceColor === "Black") {
    if (currentCell.row === 2) {
      // pawns may move 2 spaces on first move only
      return ((0 < newCell.row - currentCell.row < 3) && currentCell.cell === newCell.cell)
    } else {
      return (newCell.row - currentCell.row === 1 && currentCell.cell === newCell.cell)
    }
  } else if (currentCell.pieceColor === "White") {
    if (currentCell.row === 7) {
      // pawns may move 2 spaces on first move only
      return ((0 < currentCell.row - newCell.row < 3) && currentCell.cell === newCell.cell)
    } else {
      return (currentCell.row - newCell.row === 1 && currentCell.cell === newCell.cell)
    }
  } 
}

const isPawnBlocked = (board, currentCell, newCell) => {
  const numOfMoves = currentCell.row - newCell.row
  let checkCell = null

  if (numOfMoves > 0) {
    for(let i = 1; i <= numOfMoves; i++) {
      checkCell = board.find(function(e) {
        return ((e.row === currentCell.row - i) && (e.cell === currentCell.cell))
      })

      // check if next cell is currently occupied
      if (checkCell.value !== "") {
        return true
      }
    }
  } else {
    for(let i = -1; i >= numOfMoves; i--) {
      checkCell = board.find(function(e) {
        return ((e.row === currentCell.row - i) && (e.cell === currentCell.cell))
      })
      
      // check if next cell is currently occupied
      if (checkCell.value !== "") {
        return true
      }
    }
  }

  return false;
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
  // find differences between current and new row and current and new cell - initiate checkCell variable
  const rowNum = currentCell.row - newCell.row
  const cellNum = currentCell.cell - newCell.cell
  let checkCell = null

  if (rowNum > 0) {
    for(let i = 1; i < rowNum; i++) {
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
    for(let i = -1; i > rowNum; i--){
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