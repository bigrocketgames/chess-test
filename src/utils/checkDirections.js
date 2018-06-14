export const horizontalCheck = (updatedBoard, kingCell, attackColor) => {
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

export const verticalCheck = (updatedBoard, kingCell, attackColor, forBlockVertical = false) => {
  let checkingPieces = ["Rook", "Queen"]
  const movesUp = kingCell.row - 1;
  const movesDown = 8 - kingCell.row;
  // check up the board
  for (let i = 1; i <= movesUp; i++) {
    if ((i === 1 && attackColor === "Black") || (i ===2 && attackColor === "Black" && kingCell.row === 4)) checkingPieces = ["Rook", "Queen", "Pawn"]
    
    const result = getCheckCell(updatedBoard, kingCell.row - i, kingCell.cell, checkingPieces, attackColor)
    if (result === "no threat") {
      break;
    } else if (result) {
      return true
    }
  }

  // check down the board
  for (let i = 1; i <= movesDown; i++) {
    if ((i === 1 && attackColor === "White") || (i ===2 && attackColor === "White" && kingCell.row === 5)) checkingPieces = ["Rook", "Queen", "Pawn"]

    const result = getCheckCell(updatedBoard, kingCell.row + i, kingCell.cell, checkingPieces, attackColor)
    if (result === "no threat") {
      break;
    } else if (result) {
      return true
    }
  }

  return false
}

export const diagonalCheck = (updatedBoard, kingCell, attackColor, canCaptureWithPawn = false) => {
  let checkingPieces = ["Bishop", "Queen"]
  const movesUp = kingCell.row - 1;
  const movesDown = 8 - kingCell.row;
  const movesRight = 8 - kingCell.cell;
  const movesLeft = kingCell.cell - 1;

  // check to the top right - -vert, +hor
  const upRight = (movesUp < movesRight) ? movesUp : movesRight
  for (let i = 1; i <= upRight; i++) {
    (i === 1 && canCaptureWithPawn && attackColor === "Black") ? checkingPieces = ["Bishop", "Queen", "Pawn"] : checkingPieces
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
    (i === 1 && canCaptureWithPawn && attackColor === "Black") ? checkingPieces = ["Bishop", "Queen", "Pawn"] : checkingPieces
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
      (i === 1 && canCaptureWithPawn && attackColor === "White") ? checkingPieces = ["Bishop", "Queen", "Pawn"] : checkingPieces
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
    (i === 1 && canCaptureWithPawn && attackColor === "White") ? checkingPieces = ["Bishop", "Queen", "Pawn"] : checkingPieces
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
export const knightCheck = (updatedBoard, kingCell, attackColor) => {
  const checkingPieces = ["Knight"];
  const movesUp = (kingCell.row - 1 > 2) ? 2 : kingCell.row - 1
  const movesDown = (8 - kingCell.row > 2) ? 2 : 8 - kingCell.row

  // check top right - -vert +hor
  for (let i = 1; i <= movesUp; i++) {
    if (i === 1) {
      const result = getCheckCell(updatedBoard, kingCell.row - i, kingCell.cell + 2, checkingPieces, attackColor)
      if (result === "no threat") {
        break;
      } else if (result) {
        return true
      }
    } else {
      const result = getCheckCell(updatedBoard, kingCell.row - i, kingCell.cell + 1, checkingPieces, attackColor)
      if (result === "no threat") {
        break;
      } else if (result) {
        return true
      }
    }
  }

  // check top left - -vert -hor
  for (let i = 1; i <= movesUp; i++) {
    if (i === 1) {
      const result = getCheckCell(updatedBoard, kingCell.row - i, kingCell.cell - 2, checkingPieces, attackColor)
      if (result === "no threat") {
        break;
      } else if (result) {
        return true
      }
    } else {
      const result = getCheckCell(updatedBoard, kingCell.row - i, kingCell.cell - 1, checkingPieces, attackColor)
      if (result === "no threat") {
        break;
      } else if (result) {
        return true
      }
    }
  }

  // check bottom right - +vert +hor
  for (let i = 1; i <= movesDown; i++) {
    if (i === 1) {
      const result = getCheckCell(updatedBoard, kingCell.row + i, kingCell.cell + 2, checkingPieces, attackColor)
      if (result === "no threat") {
        break;
      } else if (result) {
        return true
      }
    } else {
      const result = getCheckCell(updatedBoard, kingCell.row + i, kingCell.cell + 1, checkingPieces, attackColor)
      if (result === "no threat") {
        break;
      } else if (result) {
        return true
      }
    }
  }

  // check bottom left - +vert - hor
  for (let i = 1; i <= movesDown; i++) {
    if (i === 1) {
      const result = getCheckCell(updatedBoard, kingCell.row + i, kingCell.cell - 2, checkingPieces, attackColor)
      if (result === "no threat") {
        break;
      } else if (result) {
        return true
      }
    } else {
      const result = getCheckCell(updatedBoard, kingCell.row + i, kingCell.cell - 1, checkingPieces, attackColor)
      if (result === "no threat") {
        break;
      } else if (result) {
        return true
      }
    }
  }
  
  return false
}

export const getCheckCell = (updatedBoard, row, cell, checkingPieces, attackColor) => {
  let checkCell = null;
  checkCell = updatedBoard.find(function(e) {
    return (e.row === row && e.cell === cell)
  })

  if (checkCell) {
    if (checkingPieces.includes(checkCell.piece) && checkCell.pieceColor === attackColor) {
      return true
    } else if (checkCell.piece && (checkCell.pieceColor !== attackColor || !checkingPieces.includes(checkCell.piece))) {
      return "no threat"
    }
  } else {
    return "no threat"
  }
  
}