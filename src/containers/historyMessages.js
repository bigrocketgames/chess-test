import React from 'react';
import PropTypes from 'prop-types';

export const HistoryMessages = (props) => {
  const { move } = props

  // return the messages in the history box
  return(
    <div className="historyMessage">
      <p>{move.message}</p>
      <hr/>
    </div>
  )
}

HistoryMessages.propTypes = {
  move: PropTypes.object
}