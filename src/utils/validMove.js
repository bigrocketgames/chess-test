import { diagonalBlock, verticalBlock, horizontalBlock, pawnBlock } from "./blockedMove";

export const canPieceMoveToNewCell = (board, piece, currentCell, newCell) => {
  switch(piece) {
    case "Bishop":
      // implement logic to check if valid move
      return validBishopMove(board, currentCell, newCell);

    case "Knight":
      // implement logic to check if valid move
      return validKnightMove(currentCell, newCell);

    case "Pawn":
      // returns true or false to confirm if move can be made or not
      if(!pawnCapture(currentCell, newCell)) {
        return validPawnMove(board, currentCell, newCell)
      } else {
        return true
      }

    case "Rook":
      // returns true or false to confirm if move by Rook can be made or not
      return validRookMove(board, currentCell, newCell);

    case "King":
      // returns true or false to confirm if move by King can be made or not
      if(validKingMove(currentCell, newCell)) {
        return !isKingChecked(board, currentCell, newCell)
      }
      return false;

    case "Queen":
      // returns true or false to confirm if move by Queen can be made or not
      return validQueenMove(board, currentCell, newCell);

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

const validPawnMove = (board, currentCell, newCell) => {
  if (currentCell.pieceColor === "Black") {
    if (currentCell.row === 2) {
      // pawns may move 2 spaces on first move only
      if ((0 < newCell.row - currentCell.row < 3) && currentCell.cell === newCell.cell) {
        return !pawnBlock(board, currentCell, newCell);
      } else {
        return false;
      }
    } else {
      if (newCell.row - currentCell.row === 1 && currentCell.cell === newCell.cell) {
        return !pawnBlock(board, currentCell, newCell);
      } else {
        return false;
      }
    }
  } else if (currentCell.pieceColor === "White") {
    if (currentCell.row === 7) {
      // pawns may move 2 spaces on first move only
      if ((0 < currentCell.row - newCell.row < 3) && currentCell.cell === newCell.cell) {
        return !pawnBlock(board, currentCell, newCell)
      } else {
        return false;
      }
    } else {
      if (currentCell.row - newCell.row === 1 && currentCell.cell === newCell.cell) {
        return !pawnBlock(board, currentCell, newCell)
      } else {
        return false;
      }
    }
  } 
}

const validRookMove = (board, currentCell, newCell) => {
  if ((Math.abs(currentCell.row - newCell.row) > 0 && currentCell.cell - newCell.cell === 0) || (Math.abs(currentCell.cell - newCell.cell) > 0 && currentCell.row - newCell.row === 0)) {
    if (Math.abs(currentCell.row - newCell.row) > 0 && currentCell.cell - newCell.cell === 0) {
      return !verticalBlock(board, currentCell, newCell);
    } else {
      return !horizontalBlock(board, currentCell, newCell);
    }
  } else {
    return false;
  }
}

const validBishopMove = (board, currentCell, newCell) => {
  if (Math.abs(currentCell.row - newCell.row) === Math.abs(currentCell.cell - newCell.cell)) {
    return !diagonalBlock(board, currentCell, newCell);
  } else {
    return false;
  }
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

const validKingMove = (currentCell, newCell) => {
  return (Math.abs(currentCell.row - newCell.row) < 2 && Math.abs(currentCell.cell - newCell.cell) < 2)
}

const isKingChecked = (board, currentCell, newCell) => {
  return false
}

const validQueenMove = (board, currentCell, newCell) => {
  if ( (Math.abs(currentCell.row - newCell.row) === Math.abs(currentCell.cell - newCell.cell)) || (Math.abs(currentCell.row - newCell.row) > 0 && (currentCell.cell - newCell.cell === 0)) || (currentCell.row - newCell.row === 0 && Math.abs(currentCell.cell - newCell.cell) > 0) ) {
    if (Math.abs(currentCell.row - newCell.row) === Math.abs(currentCell.cell - newCell.cell) && currentCell.row - newCell.row !== 0) {
      return !diagonalBlock(board, currentCell, newCell);
    } else if (Math.abs(currentCell.row - newCell.row) > 0 && (currentCell.cell - newCell.cell === 0)) {
      return !verticalBlock(board, currentCell, newCell);
    } else {
      return !horizontalBlock(board, currentCell, newCell);
    }
  } else {
    return false
  }
}