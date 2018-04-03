import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BoardSpace } from '../containers/boardSpace';
import { Button } from '../containers/button';
import { updateMessageSuccess, resetMessageState } from '../redux/message/actions';
import { moveSuccess, resetBoard } from '../redux/board/actions';
import { addHistorySuccess, resetHistory } from '../redux/history/actions';
import { canPieceMoveToNewCell, gameWon } from '../utils/helpers';

class GameBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedCell: 0,
      readyToMove: 'no',
      cellMoveFrom: null,
      errorMoveCell: 0,
      successfullMoveCell: 0
    }

    this.handlCellClick = this.handleCellClick.bind(this)
    this.resetBoard = this.resetBoard.bind(this)
  }

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
  resetBoard() {
    this.props.resetBoard();
    this.props.resetHistory();
    this.props.resetMessageState();
    this.setState({
      selectedCell: 0,
      readyToMove: 'no',
      cellMoveFrom: null,
      errorMoveCell: 0,
      successfullMoveCell: 0
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

    // Select the space if it isn't empty.
    if (cell.piece !== "" && cell.pieceColor === gameState.turnColor) {
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
      
      // check if piece can be captured and game won if the clicked on space is occupied by the other team's color.
      if (cell.pieceColor !== pieceToMove.pieceColor && cell.pieceColor !== "") {
        if (canPieceMoveToNewCell(gameState.board, pieceToMove.piece, pieceToMove, cell)) {

          // check if game is won and return result as necessary
          if (gameWon(gameState.board, cell.pieceColor, cell)) {
            pastGameState = gameState;
            message = `You have captured the ${cell.pieceColor} ${cell.piece} in cell ${cell.space} with your ${pieceToMove.pieceColor} ${pieceToMove.piece}!  ${pieceToMove.pieceColor} WINS!`
            const historyMessage = `Captured the ${cell.pieceColor} ${cell.piece} in cell ${cell.space} with the ${pieceToMove.pieceColor} ${pieceToMove.piece} from cell ${pieceToMove.space} to win!`
            history = {gameState: pastGameState, message: historyMessage}
          } else {
            pastGameState = gameState;
            message = `You have captured the ${cell.pieceColor} ${cell.piece} in cell ${cell.space} with your ${pieceToMove.pieceColor} ${pieceToMove.piece}!  ${nextColor} it is your turn.`
            const historyMessage = `Captured the ${cell.pieceColor} ${cell.piece} in cell ${cell.space} with the ${pieceToMove.pieceColor} ${pieceToMove.piece} from cell ${pieceToMove.space}`
            history = {gameState: pastGameState, message: historyMessage}
          }

          this.successfulMoveUpdate(pieceToMove.piece, pieceToMove, cell, message, history);

        }
      } else if (cell.pieceColor === "") {

        // check to see if the proposed move is valid and update as needed
        if (canPieceMoveToNewCell(gameState.board, pieceToMove.piece, pieceToMove, cell)) {
          pastGameState = gameState;
          message = `You have successfully moved ${pieceToMove.pieceColor} ${pieceToMove.piece} to cell ${cell.space}!  ${nextColor} it is your turn.`
          const historyMessage = `Moved ${pieceToMove.pieceColor} ${pieceToMove.piece} from cell ${pieceToMove.space} to cell ${cell.space}`
          const history = {gameState: pastGameState, message: historyMessage}

          this.successfulMoveUpdate(pieceToMove.piece, pieceToMove, cell, message, history);
          
        } else {
          // dispatch to message to display that an invalid move was attempted
          message = `You can not move ${pieceToMove.pieceColor} ${pieceToMove.piece} to cell ${cell.space}!`
          updateMessageSuccess(message)
  
          // Set local state for to show which cell was erroneously attempted to move to
          this.setState({
            ...this.state,
            errorMoveCell: cell.id
          })
        }
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