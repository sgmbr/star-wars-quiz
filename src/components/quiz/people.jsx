import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BASE_URL, fetchSwapi } from 'lib/swapi'
import { shuffleArray, getRandomUrls } from 'lib/util'
import $ from 'jquery'
import 'bootstrap'

import Choice from './choice'
import Modal from './modal'

import './quiz.css'

class PeopleQuiz extends Component {
  constructor (props) {
    super(props)
    this.state = {
      question: 'doodoodoo...',
      answer: '',
      choices: ['', '', '', '']
    }

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount () {
    this.generateQuestion(this.props.peopleUrls)
  }

  // This detects props change
  // Without this, it fails to re-render quiz when reloaded on PeopleQuiz page
  /*
  componentWillReceiveProps (nextProps) {
    if (this.props.peopleUrls !== nextProps.peopleUrls) {
      this.generateQuestion(nextProps.peopleUrls)
    }
  }
  */

  setLoadingState () {
    // Loading sign
    this.setState({
      question: 'doodoodoo...',
      answer: '',
      choices: ['', '', '', '']
    })
  }

  async generateQuestion (urls) {
    // Default question before urls are loaded
    const defaultUrls = [
      `${BASE_URL}people/1/`,
      `${BASE_URL}people/2/`,
      `${BASE_URL}people/3/`,
      `${BASE_URL}people/4/`
    ]
    urls = urls.length ? urls : defaultUrls

    this.setLoadingState()

    try {
      const randomUrls = getRandomUrls(urls)
      const [person, wrong1, wrong2, wrong3] = await Promise.all([fetchSwapi(randomUrls[0]), fetchSwapi(randomUrls[1]), fetchSwapi(randomUrls[2]), fetchSwapi(randomUrls[3])])
      const [specie, homeworld] = await Promise.all([fetchSwapi(person.species), fetchSwapi(person.homeworld)])
      let choices = shuffleArray([person.name, wrong1.name, wrong2.name, wrong3.name])

      this.setState({
        question: `${person.height} cm ${person.mass} kg ${specie.name}, skin colour is ${person.skin_color}, whose home planet is ${homeworld.name}`,
        answer: person.name,
        choices: choices
      })
      // console.log(person, wrong1, wrong2, wrong3)
    } catch (error) {
      // console.log('Request failed', error)
      throw error
    }
  }

  handleChoiceClick (choice) {
    let title = (choice === this.state.answer) ? 'Correct Answer' : 'Wrong Answer'
    this.setState({
      modalTitle: title
    })
    $('#checkAnswer').modal('show')
  }

  handleNextClick () {
    this.generateQuestion(this.props.peopleUrls)
  }

  render () {
    return (
      <div>
        <h1>People Quiz</h1>
        <div className='question'>
          <h2>Who is this?</h2>
          <p className='question-body'>{this.state.question}</p>
        </div>
        <div>
          <Choice value={this.state.choices[0]} onClick={() => this.handleChoiceClick(this.state.choices[0])} />
          <Choice value={this.state.choices[1]} onClick={() => this.handleChoiceClick(this.state.choices[1])} />
          <Choice value={this.state.choices[2]} onClick={() => this.handleChoiceClick(this.state.choices[2])} />
          <Choice value={this.state.choices[3]} onClick={() => this.handleChoiceClick(this.state.choices[3])} />
        </div>

        <Modal
          modalTitle={this.state.modalTitle}
          answer={this.state.answer}
          onClick={() => this.handleNextClick()}
        />

      </div>
    )
  }
}

PeopleQuiz.propTypes = {
  peopleUrls: PropTypes.array
}

export default PeopleQuiz
