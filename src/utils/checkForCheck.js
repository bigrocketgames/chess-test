import {horizontalCheck, verticalCheck, diagonalCheck, knightCheck} from './checkDirections';
import { updateBoard } from './boardUpdater';

// check if king is checked after another piece moves
export const isKingChecked = (board, turnColor, pieceToMove, cell, ownKing = false) => {
  let kingToCheck = null;
  let attackColor = null;
  const updatedBoard = updateBoard(board, pieceToMove, cell);

  if (ownKing) {
    const kingColor = turnColor;
    attackColor = (turnColor === "White") ? "Black" : "White"
    kingToCheck = getKing(updatedBoard, kingColor)
  } else {
    const kingColor = (turnColor === "White") ? "Black" : "White"
    attackColor = turnColor;
    // check only the king of the attacked color - if white moved, check on the black king and vice versa
    kingToCheck = getKing(updatedBoard, kingColor)
  }
  
  

  // determine if checked from a horizontal attack
  if (horizontalCheck(updatedBoard, kingToCheck, attackColor) || verticalCheck(updatedBoard, kingToCheck, attackColor) || diagonalCheck(updatedBoard, kingToCheck, attackColor, true) || knightCheck(updatedBoard, kingToCheck, attackColor)){
    return true
  }

  return false
}

export const checkMate = (board, turnColor, pieceToMove, cell) => {
  const kingColor = (turnColor === "White") ? "Black" : "White"
  const updatedBoard = updateBoard(board, pieceToMove, cell)
  const kingToCheck = getKing(board, kingColor)

  // check this by testing for spots the king could perhaps move and if they are safe spaces
  for (let r = -1; r < 2; r++) {
    for (let c = -1; c < 2; c++) {
      if (r !== 0 || c !== 0) {
        // get cell we want to move king to test if safe
        const newKingCell = updatedBoard.find(function(e) {
          return ((e.row === kingToCheck.row + r) && (e.cell === kingToCheck.cell + c))
        })

        // if cell is empty or contains an enemy piece - test the move to that cell
        if (newKingCell && (newKingCell.pieceColor === turnColor || newKingCell.pieceColor === "")) {
          const testBoard = updateBoard(updatedBoard, kingToCheck, newKingCell)
          const testKing = getKing(testBoard, kingColor)
          
          if (!horizontalCheck(updatedBoard, testKing, turnColor) && !verticalCheck(updatedBoard, testKing, turnColor) && !diagonalCheck(updatedBoard, testKing, turnColor) && !knightCheck(updatedBoard, testKing, turnColor)) {
            return false
          }
        }

      }
    }
  }

  // need to have this return true if it gets to this point to signify that the king is in checkmate
  return true
  
}

const getKing = (board, kingColor) => {
  return board.find(function(e) {
    return ((e.piece === "King") && (e.pieceColor === kingColor))
  })
}