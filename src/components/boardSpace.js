import React, { Component } from 'react';

class BoardSpace extends Component {
  
  render() {
    const { space, selected, handleCellClick, flashError, flashSuccess } = this.props

    return(
      <div className={`space ${space.color} ${selected} ${flashError} ${flashSuccess}`} onClick={(e) => handleCellClick(e, space)} >
        <div className={`nameDiv ${space.value}`}>
          <p className="spaceName">{space.space}</p>
        </div>
      </div>
    )
  }
}

export default BoardSpace;