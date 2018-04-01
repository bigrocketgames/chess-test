import React, { Component } from 'react';

class BoardSpace extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick = (e, space) => {
    e.preventDefault();
    console.log("you clicked" + space.props.space.space);
  }

  render() {
    const { space } = this.props
    return(
      <div className={(space.color === "light") ? "space light" : "space dark"} onClick={(e) => this.handleClick(e, this)} >
        <p className="spaceName">{space.space}</p>
      </div>
    )
  }
}

export default BoardSpace;