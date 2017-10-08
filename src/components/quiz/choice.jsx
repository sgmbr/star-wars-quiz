import React from 'react'
import PropTypes from 'prop-types'

function Choice (props) {
  return (
    <button className='btn btn-light btn-lg btn-block' onClick={props.onClick}>
      {props.value}
    </button>
  )
}

Choice.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
}

export default Choice
