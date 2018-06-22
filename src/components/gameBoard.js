import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BoardSpace } from '../containers/boardSpace';
import { Button } from '../containers/button';
import { updateMessageSuccess, resetMessageState } from '../redux/message/actions';
import { moveSuccess, resetBoard } from '../redux/board/actions';
import { addHistorySuccess, resetHistory } from '../redux/history/actions';
import { canPieceMoveToNewCell, canCastle } from '../utils/validMove';
import { isKingChecked, checkMate } from '../utils/checkForCheck';
import { canBlockCheck } from '../utils/canBlockCheck';

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
  successfulMoveUpdate = (piece, pieceToMove, cell, message, history) => {
    // dispatch to board to move piece
    this.props.moveSuccess(pieceToMove.piece, pieceToMove, cell)
          
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

  handleCellClick = (e, cell) => {
    let message = ""
    let pastGameState = null
    let history = null
    const { readyToMove, pieceToMove } = this.state
    const { updateMessageSuccess, gameState } = this.props

    
    if (pieceToMove && canCastle(gameState, cell, pieceToMove)) {
      
    } else if (cell.piece !== "" && cell.pieceColor === gameState.turnColor) {
      // Select the piece the player wishes to move.
      message = `You have chosen the ${cell.pieceColor} ${cell.piece} in cell ${cell.space}.`
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
      const nextColor = (pieceToMove.pieceColor === "White") ? "Black" : "White"

      // check if piece can move to selected space
      if (canPieceMoveToNewCell(gameState.board, pieceToMove.piece, pieceToMove, cell)) {
        
        // check to make sure move doesn't put own king in check
        if (isKingChecked(gameState.board, gameState.turnColor, pieceToMove, cell, true)) {
          // if no - produce error message and update message box
          // dispatch to update message to display that an invalid move was attempted
          message = `You can not move ${pieceToMove.pieceColor} ${pieceToMove.piece} to cell ${cell.space} beucase it will put your own king in check!`
          updateMessageSuccess(message)

          // Set local state to show which cell was erroneously attempted to move to
          this.setState({
            ...this.state,
            errorMoveCell: cell.id
          })
        } else {
          // if move is valid - then see if that produces a check on enemy king
          if (isKingChecked(gameState.board, gameState.turnColor, pieceToMove, cell)) {
            // if yes - can the check be blocked
            if (canBlockCheck(gameState.board, gameState.turnColor, pieceToMove, cell)) {
              // if yes - produce check message
              pastGameState = gameState;
              message = `You have successfully moved ${pieceToMove.pieceColor} ${pieceToMove.piece} to cell ${cell.space}!  ${nextColor} your king is in check and it is your turn.`
              const historyMessage = `Moved ${pieceToMove.pieceColor} ${pieceToMove.piece} from cell ${pieceToMove.space} to cell ${cell.space} - check`
              history = {gameState: pastGameState, message: historyMessage}

              this.successfulMoveUpdate(pieceToMove.piece, pieceToMove, cell, message, history)
            } else {
              // if no - is it a checkmate
              if (checkMate(gameState.board, gameState.turnColor, pieceToMove, cell)) {
                // if yes - produce game winning message and lock board
                pastGameState = gameState;
                message = `You have successfully moved ${pieceToMove.pieceColor} ${pieceToMove.piece} to cell ${cell.space}!  ${nextColor} your king is in checkmate and you have been defeated.`
                const historyMessage = `Moved ${pieceToMove.pieceColor} ${pieceToMove.piece} from cell ${pieceToMove.space} to cell ${cell.space} - checkmate - ${pieceToMove.pieceColor} WINS!!!`
                history = {gameState: pastGameState, message: historyMessage}

                this.successfulMoveUpdate(pieceToMove.piece, pieceToMove, cell, message, history)
              } else {
                // if no - produce check message
                pastGameState = gameState;
                message = `You have successfully moved ${pieceToMove.pieceColor} ${pieceToMove.piece} to cell ${cell.space}!  ${nextColor} your king is in check and it is your turn.`
                const historyMessage = `Moved ${pieceToMove.pieceColor} ${pieceToMove.piece} from cell ${pieceToMove.space} to cell ${cell.space} - check`
                history = {gameState: pastGameState, message: historyMessage}

                this.successfulMoveUpdate(pieceToMove.piece, pieceToMove, cell, message, history)
              }
            }
          } else {
            // if no - produce move message
            pastGameState = gameState;
            message = `You have successfully moved ${pieceToMove.pieceColor} ${pieceToMove.piece} to cell ${cell.space}!  ${nextColor} it is your turn.`
            const historyMessage = `Moved ${pieceToMove.pieceColor} ${pieceToMove.piece} from cell ${pieceToMove.space} to cell ${cell.space}`
            history = {gameState: pastGameState, message: historyMessage}

            this.successfulMoveUpdate(pieceToMove.piece, pieceToMove, cell, message, history)
          } 
        }
      } else {
        // if no - produce error message and update message box
        // dispatch to update message to display that an invalid move was attempted
        message = `You can not move ${pieceToMove.pieceColor} ${pieceToMove.piece} to cell ${cell.space}!`
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
    resetHistory: resetHistory
  }, dispatch);
}

export default connect((mapStateToProps), mapdDispatchToProps)(GameBoard);