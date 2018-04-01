import React, { Component } from 'react';

class BoardSpace extends Component {
  
  render() {
    const { space, selected, handleCellClick } = this.props

    return(
      <div className={`space ${space.color} ${selected}`} onClick={(e) => handleCellClick(e, space)} >
        <div className={`nameDiv ${space.value}`}>
          <p className="spaceName">{space.space}</p>
        </div>
      </div>
    )
  }
}

export default BoardSpace;