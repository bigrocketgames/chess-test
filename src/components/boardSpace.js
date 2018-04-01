import React, { Component } from 'react';

class BoardSpace extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick = (e, space) => {
    e.preventDefault();
    console.log("you clicked " + space.props.space.value + " " + space.props.space.space); 
  }

  render() {
    const { space } = this.props
    return(
      <div className={`space ${space.color}`} onClick={(e) => this.handleClick(e, this)} >
        <div className={`nameDiv +  ${space.value}`}>
          <p className="spaceName">{space.space}</p>
        </div>
      </div>
    )
  }
}

export default BoardSpace;