import React, { Component } from 'react';

class GameBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      board: [ {location: 'a1', value: ''} ]
    }
  }

  render() {
    
    return(
      <div className="board">
        <p>This is where the game board goes.</p>
      </div>
    )
  }
}

export default GameBoard;