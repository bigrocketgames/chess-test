import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BoardSpace from './boardSpace';
import { updateMessageSuccess } from '../redux/message/actions';
import { moveSuccess } from '../redux/board/actions';
import { canPieceMoveToNewCell } from '../utils/helpers';

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
  }

  handleCellClick = (e, cell) => {
    let message = ""
    const { readyToMove, pieceToMove } = this.state
    const { updateMessageSuccess, board } = this.props

    if ((readyToMove === 'no' && cell.piece !== "") || cell.piece !== "") {
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
      if (canPieceMoveToNewCell(board, pieceToMove.piece, pieceToMove, cell)) {
        // dispatch to board to move piece
        this.props.moveSuccess(pieceToMove.piece, pieceToMove, cell)
        
        // dispatch to message to display that a move was made
        message = `You have successfully moved ${pieceToMove.pieceColor} ${pieceToMove.piece} to cell ${cell.space}!`
        updateMessageSuccess(message)
        
        // dispatch to history to update history with move
        
        // reset local state to get ready for next move
        this.setState({
          ...this.state,
          selectedCell: "",
          readyToMove: 'no',
          pieceToMove: null,
          successfullMoveCell: cell.id
        })
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

  render() {
    const { board } = this.props
    const { selectedCell, errorMoveCell, successfullMoveCell } = this.state
    
    return(
      <div className="board">
        {board.length && board.map(space => <BoardSpace key={space.id} space={space} selected={(selectedCell === space.id) ? "selected" : ""} flashSuccess={(successfullMoveCell === space.id) ? "flashSuccess" : ""} flashError={(errorMoveCell === space.id) ? "flashError" : ""} handleCellClick={(e, cell) => this.handleCellClick(e, cell)} />)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    board: state.board
  })
}

const mapdDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateMessageSuccess: updateMessageSuccess,
    moveSuccess: moveSuccess
  }, dispatch);
}

export default connect((mapStateToProps), mapdDispatchToProps)(GameBoard);