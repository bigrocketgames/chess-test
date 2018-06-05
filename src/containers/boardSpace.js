import React from 'react';
import PropTypes from 'prop-types';

export const BoardSpace = (props) => {
  const { space, selected, handleCellClick, flashError, flashSuccess } = props

  // return each space on the board
  return(
    
    // TODO - create function to concat all of my possible classes and return as one string, so no empty spaces


    <div className={`space ${space.color} ${selected} ${flashError} ${flashSuccess}`} onClick={(e) => handleCellClick(e, space)} >
      <div className={`nameDiv ${space.value}`}>
        <p className="spaceName">{space.space}</p>
      </div>
    </div>
  )
}

BoardSpace.propTypes = {
  space: PropTypes.object,
  selected: PropTypes.string,
  handleCellClick: PropTypes.func,
  flashError: PropTypes.string,
  flashSuccess: PropTypes.string
}