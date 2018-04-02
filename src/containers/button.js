import React from 'react';
import PropTypes from 'prop-types';

export const Button = (props) => {
  const {handleClick, classes} = props

  return(
    <button className={`${classes}`} onClick={handleClick}>Reset Board</button>
  )
}

Button.propTypes = {
  handleClick: PropTypes.func,
  classes: PropTypes.string
}