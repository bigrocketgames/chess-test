// check if king is checked after another piece moves
export const isKingChecked = (board, turnColor, pieceToMove, cell) => {
  // copying board array so as not to modify the original
  let boardToUpdate = JSON.parse(JSON.stringify(board))

  // update the copy of the board to proposed move
  boardToUpdate[cell.id-1].piece =  pieceToMove.piece
  boardToUpdate[cell.id-1].pieceColor = pieceToMove.pieceColor
  boardToUpdate[cell.id-1].value = pieceToMove.value
  boardToUpdate[pieceToMove.id-1].piece = ""
  boardToUpdate[pieceToMove.id-1].pieceColor = ""
  boardToUpdate[pieceToMove.id-1].value = ""

  const kingColor = (turnColor === "White") ? "Black" : "White"
  
  // check only the king of the attacked color - if white moved, check on the black king and vice versa
  const enemyKing = boardToUpdate.find(function(e) {
    return ((e.piece === "King") && (e.pieceColor === kingColor))
  })

  // determine if checked from a horizontal attack
  if (horizontalCheck(boardToUpdate, enemyKing, turnColor) || verticalCheck(boardToUpdate, enemyKing, turnColor) || diagonalCheck(boardToUpdate, enemyKing, turnColor) || knightCheck(boardToUpdate, enemyKing, turnColor)){
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

const horizontalCheck = (updatedBoard, kingCell, kingColor) => {
  let checkCell = null;
  const movesRight = 8 - kingCell.cell;
  const movesLeft = kingCell.cell - 1;

  // check to the right
  for (let i = 1; i <= movesRight; i++) {
    checkCell = updatedBoard.find(function(e) {
      return ((e.row === kingCell.row) && (e.cell === kingCell.cell + i) )
    })

    if ((checkCell.piece === "Rook" || checkCell.piece === "Queen") && checkCell.pieceColor === kingColor) {
      return true;
    }
  }

  // check to the left
  for (let i = 1; i <= movesLeft; i++) {
    checkCell = updatedBoard.find(function(e) {
      return ((e.row === kingCell.row) && (e.cell === kingCell.cell - i))
    })

    if ((checkCell.piece === "Rook" || checkCell.piece === "Queen") && checkCell.pieceColor === kingColor) {
      return true;
    }
  }
  
  return false;
}

const verticalCheck = (updatedBoard, kingCell, kingColor) => {
  let checkCell = null;
  const movesUp = kingCell.row - 1;
  const movesDown = 8 - kingCell.row;
  // check up the board
  for (let i = 1; i <= movesUp; i++) {
    checkCell = updatedBoard.find(function(e) {
      return ((e.row === kingCell.row - i) && (e.cell === kingCell.cell))
    })

    if ((checkCell.piece === "Rook" || checkCell.piece === "Queen") && checkCell.pieceColor === kingColor) {
      return true;
    }
  }

  // check down the board
  for (let i = 1; i <= movesDown; i++) {
    checkCell = updatedBoard.find(function(e) {
      return ((e.row === kingCell.row + i) && (e.cell === kingCell.cell))
    })

    if ((checkCell.piece === "Rook" || checkCell.piece === "Queen") && checkCell.pieceColor === kingColor) {
      return true;
    }
  }
}

const diagonalCheck = (updatedBoard, kingCell, kingColor) => {
  let checkCell = null;
  const movesUp = kingCell.row - 1;
  const movesDown = 8 - kingCell.row;
  const movesRight = 8 - kingCell.cell;
  const movesLeft = kingCell.cell - 1;

  // check to the top right - -vert, +hor
  if (movesUp < movesRight) {
    for (let i = 1; i <= movesUp; i++) {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row - i) && (e.cell === kingCell.cell + i))
      })

      if ((checkCell.piece === "Bishop" || checkCell.piece === "Queen") && checkCell.pieceColor === kingColor) {
        return true;
      }
    }
  } else {
    for (let i = 1; i <= movesRight; i++) {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row - i) && (e.cell === kingCell.cell + i))
      })

      if ((checkCell.piece === "Bishop" || checkCell.piece === "Queen") && checkCell.pieceColor === kingColor) {
        return true;
      }
    }

  }
  // check to the top left - -vert, -hor
  if (movesUp < movesLeft) {
    for (let i = 1; i <= movesUp; i++) {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row - i) && (e.cell === kingCell.cell - i))
      })

      if ((checkCell.piece === "Bishop" || checkCell.piece === "Queen") && checkCell.pieceColor === kingColor) {
        return true;
      }
    }
  } else {
    for (let i = 1; i <= movesLeft; i++) {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row - i) && (e.cell === kingCell.cell - i))
      })

      if ((checkCell.piece === "Bishop" || checkCell.piece === "Queen") && checkCell.pieceColor === kingColor) {
        return true;
      }
    }
  }

  // check to the bottom right - +vert, +hor
  if (movesDown < movesRight) {
    for (let i = 1; i <= movesDown; i++) {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row + i) && (e.cell === kingCell.cell + i))
      })

      if ((checkCell.piece === "Bishop" || checkCell.piece === "Queen") && checkCell.pieceColor === kingColor) {
        return true;
      }
    }
  } else {
    for (let i = 1; i <= movesRight; i++) {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row + i) && (e.cell === kingCell.cell + i))
      })

      if ((checkCell.piece === "Bishop" || checkCell.piece === "Queen") && checkCell.pieceColor === kingColor) {
        return true;
      }
    }
  }

  // check to the bottom left - +vert, -hor
  if (movesDown < movesLeft) {
    for (let i = 1; i <= movesDown; i++) {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row + i) && (e.cell === kingCell.cell - i))
      })

      if ((checkCell.piece === "Bishop" || checkCell.piece === "Queen") && checkCell.pieceColor === kingColor) {
        return true;
      }
    }
  } else {
    for (let i = 1; i <= movesLeft; i++) {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row + i) && (e.cell === kingCell.cell - i))
      })

      if ((checkCell.piece === "Bishop" || checkCell.piece === "Queen") && checkCell.pieceColor === kingColor) {
        return true;
      }
    }
  }

  return false;
}

// check for knights that put king in check
const knightCheck = (updatedBoard, kingCell, kingColor) => {
  let checkCell = null;
  const movesUp = (kingCell.row - 1 > 2) ? 2 : kingCell.row - 1
  const movesDown = (8 - kingCell.row > 2) ? 2 : 8 - kingCell.row
  const movesLeft = (kingCell.cell - 1 > 2) ? 2 : kingCell.cell - 1
  const movesRight = (8 - kingCell.cell > 2) ? 2 : 8 - kingCell.cell

  // check top right - -vert +hor
  for (let i = 1; i <= movesUp; i++) {
    if (i === 1) {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row - i) && (e.cell === kingCell.cell + 2))
      })

      if ((checkCell.piece === "Knight") && checkCell.pieceColor === kingColor) {
        return true;
      }
    } else {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row - i) && (e.cell === kingCell.cell + 1))
      })

      if (checkCell.piece === "Knight" && checkCell.pieceColor === kingColor) {
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

      if (checkCell.piece === "Knight" && checkCell.pieceColor === kingColor) {
        return true;
      }
    } else {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row - i) && (e.cell === kingCell.cell - 1))
      })

      if (checkCell.piece === "Knight" && checkCell.pieceColor === kingColor) {
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

      if (checkCell.piece === "Knight" && checkCell.pieceColor === kingColor) {
        return true;
      }
    } else {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row + i) && (e.cell === kingCell.cell + 1))
      })

      if (checkCell.piece === "Knight" && checkCell.pieceColor === kingColor) {
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

      if (checkCell.piece === "Knight" && checkCell.pieceColor === kingColor) {
        return true;
      }
    } else {
      checkCell = updatedBoard.find(function(e) {
        return ((e.row === kingCell.row + i) && (e.cell === kingCell.cell - 1))
      })

      if (checkCell.piece === "Knight" && checkCell.pieceColor === kingColor) {
        return true;
      }
    }
  }
  
  return false
}