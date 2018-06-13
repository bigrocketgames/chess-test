import { updateBoard } from './checkForCheck';
import { horizontalCheck, verticalCheck, diagonalCheck, knightCheck } from './checkDirections';

export const canBlockCheck = (board, turnColor, pieceToMove, cell) => {
  const underAttackColor = (turnColor === "White") ? "Black" : "White";
  const updatedBoard = updateBoard(board, pieceToMove, cell);
  const attackingPiece = updatedBoard.find(function(e) {
    return (e.row === cell.row && e.cell === cell.cell)
  })

  // Return false if the attacking piece is a Knight because that check can not be blocked since it can jump pieces.
  if (attackingPiece.piece === "Knight") {
    return false
  }

  const kingUnderAttack = updatedBoard.find(function(e) {
    return (e.piece === "King" && e.pieceColor === underAttackColor)
  })

  // Return true if the piece that is checking the king can be captured on the next move by the team under attack
  if (horizontalCheck(updatedBoard, attackingPiece, underAttackColor) || verticalCheck(updatedBoard, attackingPiece, underAttackColor) || diagonalCheck(updatedBoard, attackingPiece, underAttackColor) || knightCheck(updatedBoard, attackingPiece, underAttackColor)) {
    return true
  }

  const attackDirection = getAttackDirection(attackingPiece, kingUnderAttack)

  // If the attack can be blocked by the other team on the next move return true - so checkmate is not declared
  if (canBlockAttack(updatedBoard, kingUnderAttack, attackingPiece, underAttackColor, attackDirection)) return true

  return false
}

const getAttackDirection = (attackingPiece, kingUnderAttack) => {
  const rowChange = attackingPiece.row - kingUnderAttack.row;
  const cellChange = attackingPiece.cell - kingUnderAttack.cell;

  if (rowChange !== 0 && cellChange === 0) {
    if (rowChange < 0) {
      // King is in lower row - attacking piece above
      return "BottomUp"
    } else {
      // King is in higher row - attacking piece toward bottom of board
      return "TopDown"
    }
  } else if (cellChange !== 0 && rowChange === 0) {
    if (cellChange < 0) {
      // King is to the right - attacking piece is to the left
      return "RightToLeft"
    } else {
      // King is to the left - attacking piece is to the right
      return "LeftToRight"
    }
  } else if (Math.abs(rowChange) === Math.abs(cellChange)) {
    if (rowChange < 0 && cellChange < 0) {
      // King is in lower row and to the right of the attacking piece
      return "BottomRightToTopLeft"
    } else if (rowChange < 0 && cellChange > 0) {
      // King is in lower row and to the left of the attacking piece
      return "BottomLeftToTopRight"
    } else if (rowChange > 0 && cellChange < 0) {
      // King is in a higher row and to the right of the attacking piece
      return "TopRightToBottomLeft"
    } else if (rowChange > 0 && cellChange > 0) {
      // King is in a higher row and to the left of the attacking piece
      return "TopLeftToBottomRight"
    }
  }

}

const canBlockAttack = (updatedBoard, kingUnderAttack, attackingPiece, underAttackColor, attackDirection) => {
  const rowChange = attackingPiece.row - kingUnderAttack.row;
  const cellChange = attackingPiece.cell - kingUnderAttack.cell;
  const diagonalChange = (rowChange < cellChange) ? rowChange : cellChange

  if (attackDirection === "BottomUp") {
    for (let i = 1; i < Math.abs(rowChange); i++) {
      // get next cell above king
      const testCell = getSpace(updatedBoard, kingUnderAttack.row - i, kingUnderAttack.cell)

      // check all directions if space can get occupied by an under attack piece
      if (horizontalCheck(updatedBoard, testCell, underAttackColor) || verticalCheck(updatedBoard, testCell, underAttackColor) || diagonalCheck(updatedBoard, testCell, underAttackColor) || knightCheck(updatedBoard, testCell, underAttackColor)) {
        return true
      }
    }
  } else if (attackDirection === "TopDown") {
    for (let i = 1; i < Math.abs(rowChange); i++) {
      // get next cell below king
      const testCell = getSpace(updatedBoard, kingUnderAttack.row + i, kingUnderAttack.cell)

      // check all directions if space can get occupied by an under attack piece
      if (horizontalCheck(updatedBoard, testCell, underAttackColor) || verticalCheck(updatedBoard, testCell, underAttackColor) || diagonalCheck(updatedBoard, testCell, underAttackColor) || knightCheck(updatedBoard, testCell, underAttackColor)) {
        return true
      }
    }
  } else if (attackDirection === "RightToLeft") {
    for (let i = 1; i < Math.abs(cellChange); i++) {
      // get next cell left of king
      const testCell = getSpace(updatedBoard, kingUnderAttack.row, kingUnderAttack.cell - i)

      // check all directions if space can get occupied by an under attack piece
      if (horizontalCheck(updatedBoard, testCell, underAttackColor) || verticalCheck(updatedBoard, testCell, underAttackColor) || diagonalCheck(updatedBoard, testCell, underAttackColor) || knightCheck(updatedBoard, testCell, underAttackColor)) {
        return true
      }
    }
  } else if (attackDirection === "LeftToRight") {
    for (let i = 1; i < Math.abs(cellChange); i++) {
      // get next cell right of king
      const testCell = getSpace(updatedBoard, kingUnderAttack.row, kingUnderAttack.cell + i)

      // check all directions if space can get occupied by an under attack piece
      if (horizontalCheck(updatedBoard, testCell, underAttackColor) || verticalCheck(updatedBoard, testCell, underAttackColor) || diagonalCheck(updatedBoard, testCell, underAttackColor) || knightCheck(updatedBoard, testCell, underAttackColor)) {
        return true
      }
    }
  // King is in lower row and to the right of the attacking piece
  } else if (attackDirection === "BottomRightToTopLeft") {
    for (let i = 1; i < diagonalChange; i++) {
      // get next cell left and above the king
      const testCell = getSpace(updatedBoard, kingUnderAttack.row - i, kingUnderAttack.cell - i)

      // check all directions if space can get occupied by an under attack piece
      if (horizontalCheck(updatedBoard, testCell, underAttackColor) || verticalCheck(updatedBoard, testCell, underAttackColor) || diagonalCheck(updatedBoard, testCell, underAttackColor) || knightCheck(updatedBoard, testCell, underAttackColor)) {
        return true
      }
    }

  // King is in lower row and to the left of the attacking piece
  } else if (attackDirection === "BottomLeftToTopRight") {
    for (let i = 1; i < diagonalChange; i++) {
      // get next cell left of king
      const testCell = getSpace(updatedBoard, kingUnderAttack.row - i, kingUnderAttack.cell - i)

      // check all directions if space can get occupied by an under attack piece
      if (horizontalCheck(updatedBoard, testCell, underAttackColor) || verticalCheck(updatedBoard, testCell, underAttackColor) || diagonalCheck(updatedBoard, testCell, underAttackColor) || knightCheck(updatedBoard, testCell, underAttackColor)) {
        return true
      }
    }
  // King is in a higher row and to the right of the attacking piece
  } else if (attackDirection === "TopRightToBottomLeft") {

  // King is in a higher row and to the left of the attacking piece
  } else if (attackDirection === "TopLeftToBottomRight") {

  }

  return false
}

const getSpace = (board, row, cell) => {
  return board.find(function(e) {
    return (e.row === row && e.cell === cell)
  })
}