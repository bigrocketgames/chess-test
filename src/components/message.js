import React, { Component } from 'react';
import { connect } from 'react-redux';

class Message extends Component {

  render() {
    const { message } = this.props
    return(
      <div>
        <p>{message}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    message: state.message
  })
}

export default connect(mapStateToProps)(Message);