import React from 'react';

export const HistoryMessages = (props) => {
  const { move } = props
  return(
    <div className="historyMessage">
      <p>{move.message}</p>
      <hr/>
    </div>
  )
}