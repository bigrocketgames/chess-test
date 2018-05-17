// check if king is checked after another piece moves
export const isKingChecked = (board, turnColor, pieceToMove, cell) => {
  // var newArray = JSON.parse(JSON.stringify(orgArray))
  let boardToUpdate = JSON.parse(JSON.stringify(board))
  // update the board passed in to proposed move
  boardToUpdate[cell.id-1].piece =  pieceToMove.piece
  boardToUpdate[cell.id-1].pieceColor = pieceToMove.pieceColor
  boardToUpdate[cell.id-1].value = pieceToMove.value
  boardToUpdate[pieceToMove.id-1].piece = ""
  boardToUpdate[pieceToMove.id-1].pieceColor = ""
  boardToUpdate[pieceToMove.id-1].value = ""

  const enemyColor = (turnColor === "White") ? "Black" : "White"
  
  // check only the king of the attacked color - if white moved, check on the black king and vice versa
  const enemyKing = boardToUpdate.find(function(e) {
    return ((e.piece === "King") && (e.pieceColor === enemyColor))
  })

  // determine if checked from a horizontal attack
  if (horizontalCheck(boardToUpdate, enemyKing, turnColor) || verticalCheck(boardToUpdate, enemyKing, turnColor) || diagonalCheck(boardToUpdate, enemyKing, turnColor)){
    return true
  }

  return false
}

export const willKingBeChecked = () => {
  //check if king will be checked if king moves to the new space
}

export const checkMate = () => {
  // check this only if a king is checked - return true or false
  // check this by testing for spots the king could perhaps move and if they are safe spaces
}

const horizontalCheck = (updatedBoard, kingCell, enemyColor) => {
  let checkCell = null;
  const movesRight = 8 - kingCell.cell;
  const movesLeft = kingCell.cell - 1;

  // check to the right
  for (let i = 1; i <= movesRight; i++) {
    checkCell = updatedBoard.find(function(e) {
      return ((e.row === kingCell.row) && (e.cell === kingCell.cell + i) )
    })

    if ((checkCell.piece === "Rook" || checkCell.piece === "Queen") && checkCell.pieceColor === enemyColor) {
      return true;
    }
  }

  // check to the left
  for (let i = 1; i <= movesLeft; i++) {
    checkCell = updatedBoard.find(function(e) {
      return ((e.row === kingCell.row) && (e.cell === i))
    })

    if ((checkCell.piece === "Rook" || checkCell.piece === "Queen") && checkCell.pieceColor === enemyColor) {
      return true;
    }
  }
  
  return false;
}

const verticalCheck = (updatedBoard, kingCell) => {
  let checks = 0;
  // check up the board

  // check down the board
  return checks
}

const diagonalCheck = (updatedBoard, kingCell) => {
  let checks = 0;
  // check to the top right

  // check to the top left

  // check to the bottom right

  // check to the bottom left
  return checks
}