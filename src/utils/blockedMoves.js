export const diagonalBlock = (board, currentCell, newCell) => {
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

export const verticalBlock = (board, currentCell, newCell) => {
  const numOfMoves = currentCell.row - newCell.row
  let checkCell = null

  if (numOfMoves > 0) {
    for(let i = 1; i < numOfMoves; i++) {
      checkCell = board.find(function(e) {
        return ((e.row === currentCell.row - i) && (e.cell === currentCell.cell))
      })

      // check if next cell is currently occupied
      if (checkCell.value !== "") {
        return true
      }
    }
  } else {
    for(let i = -1; i > numOfMoves; i--) {
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

export const horizontalBlock = (board, currentCell, newCell) => {
  const horMove = currentCell.cell - newCell.cell
  let checkCell = null

  if (horMove !== 0) {
    if (horMove > 0) {
      for(let i = 1; i < horMove; i++) {
        checkCell = board.find(function(e) {
          return ((e.cell === currentCell.cell - i) && (e.row === currentCell.row))
        })
      
        // check if next cell is currently occupied
        if (checkCell.value !== "") {
          return true
        }
      }
    } else {
      for(let i = -1; i > horMove; i--) {
        checkCell = board.find(function(e) {
          return ((e.cell === currentCell.cell - i) && (e.row === currentCell.row))
        })
      
        // check if next cell is currently occupied
        if (checkCell.value !== "") {
          return true
        }
      }  
    }
  }

  return false
}

export const pawnBlock = (board, currentCell, newCell) => {
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