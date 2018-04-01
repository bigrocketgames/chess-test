import React, { Component } from 'react';

class BoardSpace extends Component {

  render() {
    const { space } = this.props
    return(
      <div className="space">
        <p>This is space: {space.id}</p>
      </div>
    )
  }
}

export default BoardSpace;