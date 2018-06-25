import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BoardSpace } from '../containers/boardSpace';
import { Button } from '../containers/button';
import { updateMessageSuccess, resetMessageState } from '../redux/message/actions';
import { moveSuccess, updateCastling, resetBoard } from '../redux/board/actions';
import { addHistorySuccess, resetHistory } from '../redux/history/actions';
import { canPieceMoveToNewCell, canCastle, canPromote } from '../utils/validMove';
import { isKingChecked, checkMate } from '../utils/checkForCheck';
import { canBlockCheck } from '../utils/canBlockCheck';
import { updateBoard } from '../utils/boardUpdater';

const initialState = {
  selectedCell: 0,
  readyToMove: 'no',
  cellMoveFrom: null,
  errorMoveCell: 0,
  successfullMoveCell: 0
}

class GameBoard extends Component {
  state = initialState

  // check to see if history has been rewinded and clear local state to be ready to select a fresh piece
  componentDidUpdate(prevProps, prevState) {
    if (this.props.history.length < prevProps.history.length && this.state.selectedCell !== 0){
      this.setState({
        selectedCell: 0,
        readyToMove: 'no',
        cellMoveFrom: null,
        errorMoveCell: 0,
        successfullMoveCell: 0
      })
    }
  }

  // reset the board to the beginning game state
  resetBoard = () => {
    this.props.resetBoard();
    this.props.resetHistory();
    this.props.resetMessageState();
    this.setState({
      ...initialState
    })
  }

  // dispatches to update various pieces of state
  successfulMoveUpdate = (newBoard, cell, message, history) => {
    // dispatch to board to move piece
    this.props.moveSuccess(newBoard)
          
    // dispatch to message to display that a move was made
    this.props.updateMessageSuccess(message)
    
    // dispatch to history to update history with move
    this.props.addHistorySuccess(history)

    // reset local state to get ready for next move
    this.setState({
      ...this.state,
      selectedCell: 0,
      readyToMove: 'no',
      pieceToMove: null,
      successfullMoveCell: cell.id
    })
  }

  checkingChecks = (pieceToMove, cell, updatedBoard) => {
    let message = ""
    let pastGameState = null
    let history = null
    const { gameState } = this.props
    const nextColor = (pieceToMove.pieceColor === "White") ? "Black" : "White"

      // if move is valid - then see if that produces a check on enemy king
      if (isKingChecked(gameState.board, gameState.turnColor, pieceToMove, cell)) {
        // if yes - can the check be blocked
        if (canBlockCheck(gameState.board, gameState.turnColor, pieceToMove, cell)) {
          // if yes - produce check message
          pastGameState = gameState;
          message = `You have successfully moved ${pieceToMove.pieceColor} ${pieceToMove.piece} to ${cell.space}!  ${nextColor} your king is in check and it is your turn.`
          const historyMessage = `Moved ${pieceToMove.pieceColor} ${pieceToMove.piece} from ${pieceToMove.space} to ${cell.space} - check`
          history = {gameState: pastGameState, message: historyMessage}

          this.successfulMoveUpdate(updatedBoard, cell, message, history)
        } else {
          // if no - is it a checkmate
          if (checkMate(gameState.board, gameState.turnColor, pieceToMove, cell)) {
            // if yes - produce game winning message and lock board
            pastGameState = gameState;
            message = `You have successfully moved ${pieceToMove.pieceColor} ${pieceToMove.piece} to ${cell.space}!  ${nextColor} your king is in checkmate and you have been defeated.`
            const historyMessage = `Moved ${pieceToMove.pieceColor} ${pieceToMove.piece} from ${pieceToMove.space} to ${cell.space} - checkmate - ${pieceToMove.pieceColor} WINS!!!`
            history = {gameState: pastGameState, message: historyMessage}

            this.successfulMoveUpdate(updatedBoard, cell, message, history)
          } else {
            // if no - produce check message
            pastGameState = gameState;
            message = `You have successfully moved ${pieceToMove.pieceColor} ${pieceToMove.piece} to ${cell.space}!  ${nextColor} your king is in check and it is your turn.`
            const historyMessage = `Moved ${pieceToMove.pieceColor} ${pieceToMove.piece} from ${pieceToMove.space} to ${cell.space} - check`
            history = {gameState: pastGameState, message: historyMessage}

            this.successfulMoveUpdate(updatedBoard, cell, message, history)
          }
        }
      } else {
        // if no - produce move message
        pastGameState = gameState;
        message = `You have successfully moved ${pieceToMove.pieceColor} ${pieceToMove.piece} to ${cell.space}!  ${nextColor} it is your turn.`
        const historyMessage = `Moved ${pieceToMove.pieceColor} ${pieceToMove.piece} from ${pieceToMove.space} to ${cell.space}`
        history = {gameState: pastGameState, message: historyMessage}

        this.successfulMoveUpdate(updatedBoard, cell, message, history)
      }
  }

  handleCellClick = (e, cell) => {
    let message = ""
    const { readyToMove, pieceToMove } = this.state
    const { updateMessageSuccess, gameState, updateCastling } = this.props
    let castlingCopy = JSON.parse(JSON.stringify(gameState.castling))

    
    if (pieceToMove && canCastle(gameState, cell, pieceToMove)) {
      if (cell.piece === "Rook") {
        if (gameState.turnColor === "Black") {
          if (cell.space === "a8") {
            const newKingCell = gameState.board.find(space => space.space === "c8")
            const newRookCell = gameState.board.find(space => space.space === "d8")

            let updatedBoard = updateBoard(gameState.board, pieceToMove, newKingCell)
            updatedBoard = updateBoard(updatedBoard, cell, newRookCell)
            castlingCopy = {...castlingCopy, canBlackCastleLeft: false, canBlackCastleRight: false}

            this.checkingChecks(pieceToMove, newRookCell, updatedBoard)
            updateCastling(castlingCopy)
          } else {
            const newKingCell = gameState.board.find(space => space.space === "g8")
            const newRookCell = gameState.board.find(space => space.space === "f8")

            let updatedBoard = updateBoard(gameState.board, pieceToMove, newKingCell)
            updatedBoard = updateBoard(updatedBoard, cell, newRookCell)
            castlingCopy = {...castlingCopy, canBlackCastleLeft: false, canBlackCastleRight: false}

            this.checkingChecks(pieceToMove, newRookCell, updatedBoard)
            updateCastling(castlingCopy)
          }
        } else {
          if (cell.space === "a1") {
            const newKingCell = gameState.board.find(space => space.space === "c1")
            const newRookCell = gameState.board.find(space => space.space === "d1")

            let updatedBoard = updateBoard(gameState.board, pieceToMove, newKingCell)
            updatedBoard = updateBoard(updatedBoard, cell, newRookCell)
            castlingCopy = {...castlingCopy, canWhiteCastleLeft: false, canWhiteCastleRight: false}

            this.checkingChecks(pieceToMove, newRookCell, updatedBoard)
            updateCastling(castlingCopy)
          } else {
            const newKingCell = gameState.board.find(space => space.space === "g1")
            const newRookCell = gameState.board.find(space => space.space === "f1")

            let updatedBoard = updateBoard(gameState.board, pieceToMove, newKingCell)
            updatedBoard = updateBoard(updatedBoard, cell, newRookCell)
            castlingCopy = {...castlingCopy, canWhiteCastleLeft: false, canWhiteCastleRight: false}

            this.checkingChecks(pieceToMove, newRookCell, updatedBoard)
            updateCastling(castlingCopy)
          }
        }
      } else {
        if (gameState.turnColor === "Black") {
          if (pieceToMove.space === "a8") {
            const newKingCell = gameState.board.find(space => space.space === "c8")
            const newRookCell = gameState.board.find(space => space.space === "d8")

            let updatedBoard = updateBoard(gameState.board, cell, newKingCell)
            updatedBoard = updateBoard(updatedBoard, pieceToMove, newRookCell)
            castlingCopy = {...castlingCopy, canBlackCastleLeft: false, canBlackCastleRight: false}

            this.checkingChecks(pieceToMove, newRookCell, updatedBoard)
            updateCastling(castlingCopy)
          } else {
            const newKingCell = gameState.board.find(space => space.space === "g8")
            const newRookCell = gameState.board.find(space => space.space === "f8")

            let updatedBoard = updateBoard(gameState.board, cell, newKingCell)
            updatedBoard = updateBoard(updatedBoard, pieceToMove, newRookCell)
            castlingCopy = {...castlingCopy, canBlackCastleLeft: false, canBlackCastleRight: false}

            this.checkingChecks(pieceToMove, newRookCell, updatedBoard)
            updateCastling(castlingCopy)
          }
        } else {
          if (pieceToMove.space === "a1") {
            const newKingCell = gameState.board.find(space => space.space === "c1")
            const newRookCell = gameState.board.find(space => space.space === "d1")

            let updatedBoard = updateBoard(gameState.board, cell, newKingCell)
            updatedBoard = updateBoard(updatedBoard, pieceToMove, newRookCell)
            castlingCopy = {...castlingCopy, canWhiteCastleLeft: false, canWhiteCastleRight: false}

            this.checkingChecks(pieceToMove, newRookCell, updatedBoard)
            updateCastling(castlingCopy)
          } else {
            const newKingCell = gameState.board.find(space => space.space === "g1")
            const newRookCell = gameState.board.find(space => space.space === "f1")

            let updatedBoard = updateBoard(gameState.board, cell, newKingCell)
            updatedBoard = updateBoard(updatedBoard, pieceToMove, newRookCell)
            castlingCopy = {...castlingCopy, canWhiteCastleLeft: false, canWhiteCastleRight: false}

            this.checkingChecks(pieceToMove, newRookCell, updatedBoard)
            updateCastling(castlingCopy)
          }
        }
      }
    } else if (cell.piece !== "" && cell.pieceColor === gameState.turnColor) {
      // Select the piece the player wishes to move.
      message = `You have chosen the ${cell.pieceColor} ${cell.piece} in ${cell.space}.`
      updateMessageSuccess(message)
      this.setState({
        ...this.state,
        selectedCell: cell.id,
        readyToMove: 'yes',
        pieceToMove: cell,
        errorMoveCell: 0,
        successfullMoveCell: 0,
      })
    } else if (readyToMove === 'yes') {
      // check if piece can move to selected space
      if (canPieceMoveToNewCell(gameState.board, pieceToMove.piece, pieceToMove, cell)) {
        // check to make sure move doesn't put own king in check
        if (isKingChecked(gameState.board, gameState.turnColor, pieceToMove, cell, true)) {
          // if no - produce error message and update message box
          // dispatch to update message to display that an invalid move was attempted
          message = `You can not move ${pieceToMove.pieceColor} ${pieceToMove.piece} to ${cell.space} beucase it will put your own king in check!`
          updateMessageSuccess(message)

          // Set local state to show which cell was erroneously attempted to move to
          this.setState({
            ...this.state,
            errorMoveCell: cell.id
          })
        } else {
          let updatedBoard = null;
          // check to see if it is a pawn that can promote
          if (pieceToMove.piece === "Pawn" && canPromote(pieceToMove, cell)) {
            let copyPieceToMove = JSON.parse(JSON.stringify(pieceToMove))

            if (copyPieceToMove.pieceColor === "White") {
              copyPieceToMove.value = "queenwhite"
              copyPieceToMove.piece = "Queen"
            } else {
              copyPieceToMove.value = "queenblack"
              copyPieceToMove.piece = "Queen"
            }
            updatedBoard = updateBoard(gameState.board, copyPieceToMove, cell)
            this.checkingChecks(copyPieceToMove, cell, updatedBoard)
          } else {
            updatedBoard = updateBoard(gameState.board, pieceToMove, cell)
            this.checkingChecks(pieceToMove, cell, updatedBoard)
          }

          // Need to make sure that we disable castling if a rook or king moves
          if (pieceToMove.piece === "Rook") {
            if (pieceToMove.space === "a8" && gameState.castling.canBlackCastleLeft) {
              castlingCopy = {...castlingCopy, canBlackCastleLeft: false}
              updateCastling(castlingCopy)
            } else if (pieceToMove.space === "h8" && gameState.castling.canBlackCastleRight) {
              castlingCopy = {...castlingCopy, canBlackCastleRight: false}
              updateCastling(castlingCopy)
            } else if (pieceToMove.space === "a1" && gameState.castling.canWhiteCastleLeft) {
              castlingCopy = {...castlingCopy, canWhiteCastleLeft: false}
              updateCastling(castlingCopy)
            } else if (pieceToMove.space === "h1" && gameState.castling.canWhiteCastleRight) {
              castlingCopy = {...castlingCopy, canWhiteCastleRight: false}
              updateCastling(castlingCopy)
            }
          } else if (pieceToMove.piece === "King") {
            if (pieceToMove.space === "e8" && (gameState.castling.canBlackCastleLeft || gameState.castling.canBlackCastleRight)) {
              castlingCopy = {...castlingCopy, canBlackCastleLeft: false, canBlackCastleRight: false}
              updateCastling(castlingCopy)
            } else if (pieceToMove.space === "e1" && (gameState.castling.canWhiteCastleLeft || gameState.castling.canWhiteCastleRight)) {
              castlingCopy = {...castlingCopy, canWhiteCastleLeft: false, canWhiteCastleRight: false}
              updateCastling(castlingCopy)
            }
          }
          
        }
      } else {
        // if no - produce error message and update message box
        // dispatch to update message to display that an invalid move was attempted
        message = `You can not move ${pieceToMove.pieceColor} ${pieceToMove.piece} to ${cell.space}!`
        updateMessageSuccess(message)

        // Set local state to show which cell was erroneously attempted to move to
        this.setState({
          ...this.state,
          errorMoveCell: cell.id
        })
      }
    }
  }

  render() {
    const { gameState } = this.props
    const { selectedCell, errorMoveCell, successfullMoveCell } = this.state
    
    return(
      <div className="board-container">
        <div className="board">
          {/* map through the spaces to create the playing space */}
          {gameState.board.length && gameState.board.map(space => <BoardSpace key={space.id} space={space} selected={(selectedCell === space.id) ? "selected" : ""} flashSuccess={(successfullMoveCell === space.id) ? "flashSuccess" : ""} flashError={(errorMoveCell === space.id) ? "flashError" : ""} handleCellClick={(e, cell) => this.handleCellClick(e, cell)} />)}
        </div>
        <Button classes="reset-btn" handleClick={this.resetBoard} label="Reset Board" />
      </div>
    )
  }
}

GameBoard.propTypes = {
  initialState: PropTypes.object,
  gameState: PropTypes.object,
  history: PropTypes.array,
  updateMessageSuccess: PropTypes.func,
  resetMessageState: PropTypes.func,
  moveSuccess: PropTypes.func,
  resetBoard: PropTypes.func,
  addHistorySuccess: PropTypes.func,
  resetHistory: PropTypes.func
}

const mapStateToProps = (state) => {
  return({
    gameState: state.board,
    history: state.history
  })
}

const mapdDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateMessageSuccess: updateMessageSuccess,
    resetMessageState: resetMessageState,
    moveSuccess: moveSuccess,
    resetBoard: resetBoard,
    addHistorySuccess: addHistorySuccess,
    resetHistory: resetHistory,
    updateCastling: updateCastling
  }, dispatch);
}

export default connect((mapStateToProps), mapdDispatchToProps)(GameBoard);