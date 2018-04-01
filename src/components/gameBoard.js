import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BoardSpace from './boardSpace';
import { updateMessageSuccess } from '../redux/message/actions';
import { canPieceMoveToNewCell } from '../utils/helpers';

class GameBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedCell: 0,
      readyToMove: 'no',
      cellMoveFrom: null
    }

    this.handlCellClick = this.handleCellClick.bind(this)
  }

  handleCellClick = (e, cell) => {
    let message = ""
    const { readyToMove } = this.state

    if (readyToMove === 'no' || cell.piece !== "") {
      message = `You have chosen the ${cell.pieceColor} ${cell.piece} in cell ${cell.space}.`
      this.props.updateMessageSuccess(message)
      this.setState({
        selectedCell: cell.id,
        readyToMove: 'yes',
        pieceToMove: cell
      })
    } else if (readyToMove === 'yes') {
      if (canPieceMoveToNewCell(this.state.pieceToMove.piece, this.state.pieceToMove, cell)) {
        // dispatch to board to move piece
        // dispatch to message to display that a move was made
        // dispatch to history to update history with move
        // reset local state to get ready for next move
      }
    }
  }

  render() {
    const { board } = this.props
    const { selectedCell } = this.state
    return(
      <div className="board">
        {board.length && board.map(space => <BoardSpace key={space.id} space={space} selected={(selectedCell === space.id) ? "selected" : ""} handleCellClick={(e, cell) => this.handleCellClick(e, cell)} />)}
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
  }, dispatch);
}

export default connect((mapStateToProps), mapdDispatchToProps)(GameBoard);