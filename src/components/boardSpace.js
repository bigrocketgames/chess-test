import React, { Component } from 'react';

class BoardSpace extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick = (e) => {
    e.preventDefault();
    e.currentTarget.className = "space selected";
  }

  render() {
    const { space } = this.props
    return(
      <div className="space" onClick={this.handleClick} >
        <p>This is space: {space.id}</p>
      </div>
    )
  }
}

export default BoardSpace;