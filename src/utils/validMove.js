import { diagonalBlock, verticalBlock, horizontalBlock, pawnBlock } from "./blockedMove";
import { checkTheChecks } from './canBlockCheck';

export const canCastle = (gameState, cell, pieceToMove) => {
  if (cell.piece !== "Rook" && cell.piece !== "King") return false
  if (pieceToMove.piece !== "Rook" && pieceToMove.piece !== "King") return false

  const attackingColor = gameState.turnColor === "Black" ? "White" : "Black"

  
  if (gameState.turnColor === "Black") {
    if ((cell.piece === "Rook" && pieceToMove.piece === "King" && pieceToMove.space === "e8") || (cell.piece === "King" && cell.space === "e8" && pieceToMove.piece === "Rook")) {
      const blackKing = gameState.board.find(space => space.space === "e8");
      if ((cell.piece === "Rook" && cell.space === "a8") || (pieceToMove.piece === "Rook" && pieceToMove.space === "a8")) {
        if (gameState.castling.canBlackCastleLeft) {
          const newCell = gameState.board.find(space => space.space === "b8");
          // check to see if spaces are blocked to the left
          if (!horizontalBlock(gameState.board, blackKing, newCell)) {
            for (let i = 0; i < 3; i++) {
              const testCell = gameState.board.find(space => (space.row === blackKing.row && space.cell === blackKing.cell - i))

              if (!checkTheChecks(gameState.board, testCell, attackingColor, true, false)) return true
            }
          } else {
            return false
          }
        }
      } else if ((cell.piece === "Rook" && cell.space === "h8") || (pieceToMove.piece === "Rook" && pieceToMove.space === "h8")) {
        if (gameState.castling.canBlackCastleRight) {
          const newCell = gameState.board.find(space => space.space === "g8");
          // check to see if spaces are blocked to the right
          if (!horizontalBlock(gameState.board, blackKing, newCell)) {
            for (let i = 0; i < 3; i++) {
              const testCell = gameState.board.find(space => (space.row === blackKing.row && space.cell === blackKing.cell + i))

              if (!checkTheChecks(gameState.board, testCell, attackingColor, true, false)) return true
            }
          } else {
            return false
          }
        } 
      }
    }
  } else {
    if ((cell.piece === "Rook" && pieceToMove.piece === "King" && pieceToMove.space === "e1") || (cell.piece === "King" && cell.space === "e1" && pieceToMove.piece === "Rook")) {
      const whiteKing = gameState.board.find(space => space.space === "e1");
      if ((cell.piece === "Rook" && cell.space === "a1") || (pieceToMove.piece === "Rook" && pieceToMove.space === "a1")) {
        if (gameState.castling.canWhiteCastleLeft) {
          const newCell = gameState.board.find(space => space.space === "b1");
          // check to see if spaces are blocked to the left
          if (!horizontalBlock(gameState.board, whiteKing, newCell)) {
            for (let i = 0; i < 3; i++) {
              const testCell = gameState.board.find(space => (space.row === whiteKing.row && space.cell === whiteKing.cell - i))

              if (!checkTheChecks(gameState.board, testCell, attackingColor, true, false)) return true
            }
          } else {
            return false
          }
        }
      } else if ((cell.piece === "Rook" && cell.space === "h1") || (pieceToMove.piece === "Rook" && pieceToMove.space === "h1")) {
        if (gameState.castling.canWhiteCastleRight) {
          const newCell = gameState.board.find(space => space.space === "g1");
          // check to see if spaces are blocked to the right
          if (!horizontalBlock(gameState.board, whiteKing, newCell)) {
            for (let i = 0; i < 3; i++) {
              const testCell = gameState.board.find(space => (space.row === whiteKing.row && space.cell === whiteKing.cell + i))
              if (!checkTheChecks(gameState.board, testCell, attackingColor, true, false)) return true
            }
          } else {
            return false
          }
        } 
      }
    }
  }
  
  return false
}

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
      return validKingMove(currentCell, newCell)

    case "Queen":
      // returns true or false to confirm if move by Queen can be made or not
      return validQueenMove(board, currentCell, newCell);

    default:
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
      if ( 0 < newCell.row - currentCell.row && newCell.row - currentCell.row < 3 && currentCell.cell === newCell.cell) {
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
      if (0 < currentCell.row - newCell.row && currentCell.row - newCell.row < 3 && currentCell.cell === newCell.cell) {
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

const validQueenMove = (board, currentCell, newCell) => {
    if (Math.abs(currentCell.row - newCell.row) === Math.abs(currentCell.cell - newCell.cell) && currentCell.row - newCell.row !== 0) {
      return !diagonalBlock(board, currentCell, newCell);
    } else if (Math.abs(currentCell.row - newCell.row) > 0 && (currentCell.cell - newCell.cell === 0)) {
      return !verticalBlock(board, currentCell, newCell);
    } else if (currentCell.row - newCell.row === 0 && (Math.abs(currentCell.cell - newCell.cell) > 0)) {
      return !horizontalBlock(board, currentCell, newCell);
    }

    return false
}