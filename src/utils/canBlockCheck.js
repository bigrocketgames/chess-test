import { updateBoard, horizontalCheck, verticalCheck, diagonalCheck, knightCheck } from './checkForCheck';

export const canBlockCheck = (board, turnColor, pieceToMove, cell) => {
  const underAttackColor = (turnColor === "White") ? "Black" : "White";
  const updatedBoard = updateBoard(board, pieceToMove, cell);
  const attackingPiece = updatedBoard.find(function(e) {
    return (e.row === cell.row && e.cell === cell.cell)
  })

  if (attackingPiece.piece === "Knight") {
    return false
  }

  const kingUnderAttack = updatedBoard.find(function(e) {
    return (e.piece === "King" && e.pieceColor === underAttackColor)
  })

  const attackDirection = getAttackDirection(attackingPiece, kingUnderAttack)

  if (horizontalCheck(updatedBoard, attackingPiece, underAttackColor) || verticalCheck(updatedBoard, attackingPiece, underAttackColor) || diagonalCheck(updatedBoard, attackingPiece, underAttackColor) || knightCheck(updatedBoard, attackingPiece, underAttackColor)) {
    return true
  }

  return false
}

const getAttackDirection = (attackingPiece, kingUnderAttack) => {
  let attackDetails = { direction: "", rowChange: 0, cellChange: 0 };
  attackDetails.rowChange = attackingPiece.row - kingUnderAttack.row;
  attackDetails.cellChange = attackingPiece.cell - kingUnderAttack.cell;

  if (attackDetails.rowChange !== 0 && attackDetails.cellChange === 0) {
    if (attackDetails.rowChange < 0) {
      // King is in lower row - attacking piece above
      return "BottomUp"
    } else {
      // King is in higher row - attacking piece toward bottom of board
      return "TopDown"
    }
  } else if (attackDetails.cellChange !== 0 && attackDetails.rowChange === 0) {
    if (attackDetails.cellChange < 0) {
      // King is to the right - attacking piece is to the left
      return "RightToLeft"
    } else {
      // King is to the left - attacking piece is to the right
      return "LeftToRight"
    }
  } else if (Math.abs(attackDetails.rowChange) === Math.abs(attackDetails.cellChange)) {
    if (attackDetails.rowChange < 0 && attackDetails.cell < 0) {
      // King is in lower row and to the right of the attacking piece
      return "BottomRightToTopLeft"
    } else if (attackDetails.rowChange < 0 && attackDetails.cell > 0) {
      // King is in lower row and to the left of the attacking piece
      return "BottomLeftToTopRight"
    } else if (attackDetails.rowChange > 0 && attackDetails.cell < 0) {
      // King is in a higher row and to the right of the attacking piece
      return "TopRightToBottomLeft"
    } else if (attackDetails.rowChange > 0 && attackDetails.cell > 0) {
      // King is in a higher row and to the left of the attacking piece
      return "TopLeftToBottomRight"
    }
  }

}

const canBlockAttack = (updatedBoard, kingUnderAttack, attackingPiece, underAttackColor, attackDirection) => {
  const rowChange = attackingPiece.row - kingUnderAttack.row;
  const cellChange = attackingPiece.cell - kingUnderAttack.cell;

  if (attackDirection === "BottomUp") {
    for (let i = 1; i <= Math.abs(rowChange); i++) {
      // get next cell above king
      const testCell = getSpace(updatedBoard, kingUnderAttack.row - i, kingUnderAttack.cell)

      // check all directions if space can get occupied by an under attack piece
    }
  } else if (attackDirection === "TopDown") {

  }
}

const verticalBlock = (/* need to figure out what we want to use here */) => {

}

const getSpace = (board, row, cell) => {
  return board.find(function(e) {
    return (e.row === row && e.cell === cell)
  })
}