import React, { Component } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import 'bootstrap'

import Choice from './choice'
import Modal from './modal'
import Spinner from './spinner'

import './quiz.css'

class Quiz extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalTitle: 'Answer'
    }
  }

  /*
  // This detects props change
  // Without this, it fails to re-render quiz when reloaded on PeopleQuiz page
  // https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/update/component_will_receive_props.html
  componentWillReceiveProps (nextProps) {
    if (this.props.peopleUrls !== nextProps.peopleUrls) {
      this.generateQuestion(nextProps.peopleUrls)
    }
  }
  */

  handleChoiceClick (choice) {
    const title = (choice === this.props.answer) ? 'Correct Answer' : 'Wrong Answer'
    this.setState({
      modalTitle: title
    })
    $('#checkAnswer').modal('show')
  }

  render () {
    const question = this.props.question || 'doodoodoo...'
    const answer = this.props.answer || ''
    const choices = this.props.choices || ['Star', 'Wars', 'Quiz', 'Yey!']

    return (
      <div>
        <div className='question'>
          <h2>{this.props.quizTitle}</h2>
          <p className='question-body'>{question}</p>
        </div>
        <div>
          <Choice value={choices[0]} onClick={() => this.handleChoiceClick(choices[0])} />
          <Choice value={choices[1]} onClick={() => this.handleChoiceClick(choices[1])} />
          <Choice value={choices[2]} onClick={() => this.handleChoiceClick(choices[2])} />
          <Choice value={choices[3]} onClick={() => this.handleChoiceClick(choices[3])} />
        </div>

        <Modal
          modalTitle={this.state.modalTitle}
          answer={answer}
          onClick={this.props.handleNextClick}
        />
        {
          this.props.isLoading ? <Spinner /> : null
        }
      </div>
    )
  }
}

Quiz.propTypes = {
  quizTitle: PropTypes.string,
  question: PropTypes.string,
  answer: PropTypes.string,
  choices: PropTypes.array,
  isLoading: PropTypes.bool,
  handleNextClick: PropTypes.func
}

export default Quiz
