import React from 'react';

export const BoardSpace = (props) => {
  const { space, selected, handleCellClick, flashError, flashSuccess } = props

  return(
    <div className={`space ${space.color} ${selected} ${flashError} ${flashSuccess}`} onClick={(e) => handleCellClick(e, space)} >
      <div className={`nameDiv ${space.value}`}>
        <p className="spaceName">{space.space}</p>
      </div>
    </div>
  )
}