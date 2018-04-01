import React, { Component } from 'react';
import { connect } from 'react-redux';

import BoardSpace from './boardSpace';

class GameBoard extends Component {

  render() {
    const { board } = this.props
    return(
      <div className="board">
        {board.length && board.map(space => <BoardSpace key={space.id} space={space} />)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    board: state.board
  })
}

export default connect(mapStateToProps)(GameBoard);