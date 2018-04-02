import React from 'react';
import PropTypes from 'prop-types';

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

BoardSpace.propTypes = {
  space: PropTypes.object,
  selected: PropTypes.string,
  handleCellClick: PropTypes.func,
  flashError: PropTypes.string,
  flashSuccess: PropTypes.string
}