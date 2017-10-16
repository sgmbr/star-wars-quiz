import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BASE_URL, fetchSwapi } from 'lib/swapi'
import { shuffleArray, getRandomUrls } from 'lib/util'
import 'bootstrap'

import Quiz from './quiz'

import './quiz.css'

class PeopleQuiz extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quizTitle: 'Who is this?',
      isLoading: true
    }

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount () {
    this.generateQuestion(this.props.peopleUrls)
  }

  setLoadingState () {
    this.setState({
      isLoading: true
    })
  }

  unsetLoadingState () {
    this.setState({
      isLoading: false
    })
  }

  async generateQuestion (urls) {
    // Retrieving urls is time consuming
    // If urls are not set yet, use following as default
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
      const choices = shuffleArray([person.name, wrong1.name, wrong2.name, wrong3.name])

      this.setState({
        question: `${person.height} cm ${person.mass} kg ${specie.name}, skin colour is ${person.skin_color}, whose home planet is ${homeworld.name}`,
        answer: person.name,
        choices: choices
      })
      this.unsetLoadingState()
    } catch (error) {
      throw error
    }
  }

  handleNextClick () {
    this.generateQuestion(this.props.peopleUrls)
  }

  render () {
    return (
      <div>
        <h1>People Quiz</h1>
        <Quiz
          quizTitle={this.state.quizTitle}
          question={this.state.question}
          answer={this.state.answer}
          choices={this.state.choices}
          isLoading={this.state.isLoading}
          handleNextClick={() => this.handleNextClick()}
        />
      </div>
    )
  }
}

PeopleQuiz.propTypes = {
  peopleUrls: PropTypes.array
}

export default PeopleQuiz
