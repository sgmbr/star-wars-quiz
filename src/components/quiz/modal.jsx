import React from 'react'
import PropTypes from 'prop-types'

function Modal (props) {
  return (
    <div className='modal fade' id='checkAnswer' tabIndex='-1' role='dialog' aria-labelledby='checkAnswer' aria-hidden='true'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='checkAnswerLabel'>{props.modalTitle}</h5>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            The answer is {props.answer}
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={props.onClick}>Next Question</button>
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  modalTitle: PropTypes.string,
  answer: PropTypes.string,
  onClick: PropTypes.func
}

export default Modal
