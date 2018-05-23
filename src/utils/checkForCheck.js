// check if king is checked after another piece moves
export const isKingChecked = (board, turnColor, pieceToMove, cell, ownKing = false) => {
  let kingToCheck = null;
  let attackColor = null;
  // copying board array so as not to modify the original
  let boardToUpdate = JSON.parse(JSON.stringify(board))

  // update the copy of the board to proposed move
  boardToUpdate[cell.id-1].piece =  pieceToMove.piece
  boardToUpdate[cell.id-1].pieceColor = pieceToMove.pieceColor
  boardToUpdate[cell.id-1].value = pieceToMove.value
  boardToUpdate[pieceToMove.id-1].piece = ""
  boardToUpdate[pieceToMove.id-1].pieceColor = ""
  boardToUpdate[pieceToMove.id-1].value = ""

  if (ownKing) {
    const kingColor = turnColor;
    attackColor = (turnColor === "White") ? "Black" : "White"
    kingToCheck = boardToUpdate.find(function(e) {
      return ((e.piece === "King") && (e.pieceColor === kingColor))
    })
  } else {
    const kingColor = (turnColor === "White") ? "Black" : "White"
    attackColor = turnColor;
    // check only the king of the attacked color - if white moved, check on the black king and vice versa
    kingToCheck = boardToUpdate.find(function(e) {
      return ((e.piece === "King") && (e.pieceColor === kingColor))
    })
  }
  
  

  // determine if checked from a horizontal attack
  if (horizontalCheck(boardToUpdate, kingToCheck, attackColor) || verticalCheck(boardToUpdate, kingToCheck, attackColor) || diagonalCheck(boardToUpdate, kingToCheck, attackColor) || knightCheck(boardToUpdate, kingToCheck, attackColor)){
    return true
  }

  return false
}

export const checkMate = () => {
  // check this only if a king is checked - return true or false
  // check this by testing for spots the king could perhaps move and if they are safe spaces
  
}

const horizontalCheck = (updatedBoard, kingCell, attackColor) => {
  const checkingPieces = ["Rook", "Queen"]
  const movesRight = 8 - kingCell.cell;
  const movesLeft = kingCell.cell - 1;

  // check to the right
  for (let i = 1; i <= movesRight; i++) {
    const result = getCheckCell(updatedBoard, kingCell.row, kingCell.cell + i, checkingPieces, attackColor);
    if (result === "no threat") {
      break;
    } else if (result) {
      return true
    }
  }

  // check to the left
  for (let i = 1; i <= movesLeft; i++) {
    const result = getCheckCell(updatedBoard, kingCell.row, kingCell.cell - i, checkingPieces, attackColor);
    if (result === "no threat") {
      break;
    } else if (result) {
      return true
    }
  }
  
  return false
}

const verticalCheck = (updatedBoard, kingCell, attackColor) => {
  const checkingPieces = ["Rook", "Queen"]
  const movesUp = kingCell.row - 1;
  const movesDown = 8 - kingCell.row;
  // check up the board
  for (let i = 1; i <= movesUp; i++) {
    const result = getCheckCell(updatedBoard, kingCell.row - i, kingCell.cell, checkingPieces, attackColor)
    if (result === "no threat") {
      break;
    } else if (result) {
      return true
    }
  }

  // check down the board
  for (let i = 1; i <= movesDown; i++) {
    const result = getCheckCell(updatedBoard, kingCell.row + i, kingCell.cell, checkingPieces, attackColor)
    if (result === "no threat") {
      break;
    } else if (result) {
      return true
    }
  }

  return false
}

const diagonalCheck = (updatedBoard, kingCell, attackColor) => {
  const checkingPieces = ["Bishop", "Queen"]
  const movesUp = kingCell.row - 1;
  const movesDown = 8 - kingCell.row;
  const movesRight = 8 - kingCell.cell;
  const movesLeft = kingCell.cell - 1;

  // check to the top right - -vert, +hor
  const upRight = (movesUp < movesRight) ? movesUp : movesRight
  for (let i = 1; i <= upRight; i++) {
    const result = getCheckCell(updatedBoard, kingCell.row - i, kingCell.cell + i, checkingPieces, attackColor)
    if (result === "no threat") {
      break;
    } else if (result) {
      return true
    }
  }
  
  // check to the top left - -vert, -hor
  const upLeft = (movesUp < movesLeft) ? movesUp : movesLeft
  for (let i = 1; i <= upLeft; i++) {
    const result = getCheckCell(updatedBoard, kingCell.row - i, kingCell.cell -i, checkingPieces, attackColor)
    if (result === "no threat") {
      break;
    } else if (result) {
      return true
    }
  }

  // check to the bottom right - +vert, +hor
  const downRight = (movesDown < movesRight) ? movesDown : movesRight
    for (let i = 1; i <= downRight; i++) {
      const result = getCheckCell(updatedBoard, kingCell.row + i, kingCell.cell + i, checkingPieces, attackColor)
      if (result === "no threat") {
        break;
      } else if (result) {
        return true
      }
    }

  // check to the bottom left - +vert, -hor
  const downLeft = (movesDown < movesLeft) ? movesDown : movesLeft
  for (let i = 1; i <= downLeft; i++) {
    const result = getCheckCell(updatedBoard, kingCell.row + i, kingCell.cell - i, checkingPieces, attackColor)
    if (result === "no threat") {
      break;
    } else if (result) {
      return true
    }
  }

  return false;
}

// check for knights that put king in check
const knightCheck = (updatedBoard, kingCell, attackColor) => {
  let checkCell = null;
  const movesUp = (kingCell.row - 1 > 2) ? 2 : kingCell.row - 1
  const movesDown = (8 - kingCell.row > 2) ? 2 : 8 - kingCell.row

  // check top right - -vert +hor
  for (let i = 1; i <= movesUp; i++) {
    if (i === 1) {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row - i) && (e.cell === kingCell.cell + 2))
      })

      if ((checkCell.piece === "Knight") && checkCell.pieceColor === attackColor) {
        return true;
      }
    } else {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row - i) && (e.cell === kingCell.cell + 1))
      })

      if (checkCell.piece === "Knight" && checkCell.pieceColor === attackColor) {
        return true;
      }
    }
  }

  // check top left - -vert -hor
  for (let i = 1; i <= movesUp; i++) {
    if (i === 1) {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row - i) && (e.cell === kingCell.cell - 2))
      })

      if (checkCell.piece === "Knight" && checkCell.pieceColor === attackColor) {
        return true;
      }
    } else {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row - i) && (e.cell === kingCell.cell - 1))
      })

      if (checkCell.piece === "Knight" && checkCell.pieceColor === attackColor) {
        return true;
      }
    }
  }

  // check bottom right - +vert +hor
  for (let i = 1; i <= movesDown; i++) {
    if (i === 1) {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row  === kingCell.row + i) && (e.cell === kingCell.cell + 2))
      })

      if (checkCell.piece === "Knight" && checkCell.pieceColor === attackColor) {
        return true;
      }
    } else {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row + i) && (e.cell === kingCell.cell + 1))
      })

      if (checkCell.piece === "Knight" && checkCell.pieceColor === attackColor) {
        return true;
      }
    }
  }

  // check bottom left - +vert - hor
  for (let i = 1; i <= movesDown; i++) {
    if (i === 1) {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row + i) && (e.cell === kingCell.cell - 2))
      })

      if (checkCell.piece === "Knight" && checkCell.pieceColor === attackColor) {
        return true;
      }
    } else {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row + i) && (e.cell === kingCell.cell - 1))
      })

      if (checkCell.piece === "Knight" && checkCell.pieceColor === attackColor) {
        return true;
      }
    }
  }
  
  return false
}

const getCheckCell = (updatedBoard, row, cell, checkingPieces, attackColor) => {
  let checkCell = null;
  checkCell = updatedBoard.find(function(e) {
    return (e.row === row && e.cell === cell)
  })

  if (checkingPieces.includes(checkCell.piece) && checkCell.pieceColor === attackColor) {
    return true
  } else if (checkCell.piece && (checkCell.pieceColor !== attackColor || !checkingPieces.includes(checkCell.piece))) {
    return "no threat"
  }
  
}