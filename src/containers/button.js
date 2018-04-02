import React from 'react';
import PropTypes from 'prop-types';

export const Button = (props) => {
  const {handleClick, classes, label} = props

  return(
    <button className={`${classes}`} onClick={handleClick}>{label}</button>
  )
}

Button.propTypes = {
  handleClick: PropTypes.func,
  classes: PropTypes.string,
  label: PropTypes.string
}