import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

Message.propTypes = {
  message: PropTypes.string
}

const mapStateToProps = (state) => {
  return({
    message: state.message
  })
}

export default connect(mapStateToProps)(Message);