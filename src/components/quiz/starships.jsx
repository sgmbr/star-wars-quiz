import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BASE_URL, fetchSwapi } from 'lib/swapi'
import { shuffleArray, getRandomUrls } from 'lib/util'
import 'bootstrap'

import Quiz from './quiz'

class StarshipsQuiz extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quizTitle: 'Which manufacturer?',
      isLoading: true
    }

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount () {
    this.generateQuestion(this.props.starshipsUrls)
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
      `${BASE_URL}starships/15/`,
      `${BASE_URL}starships/5/`,
      `${BASE_URL}straships/9/`,
      `${BASE_URL}starships/10/`
    ]
    urls = urls.length ? urls : defaultUrls

    this.setLoadingState()

    try {
      const randomUrls = getRandomUrls(urls)
      const [starship, wrong1, wrong2, wrong3] = await Promise.all([fetchSwapi(randomUrls[0]), fetchSwapi(randomUrls[1]), fetchSwapi(randomUrls[2]), fetchSwapi(randomUrls[3])])

      const choices = shuffleArray([starship.manufacturer, wrong1.manufacturer, wrong2.manufacturer, wrong3.manufacturer])

      this.setState({
        question: `What is the manufacturer of ${starship.name}?`,
        answer: starship.manufacturer,
        choices: choices
      })
      this.unsetLoadingState()
    } catch (error) {
      throw error
    }
  }

  handleNextClick () {
    this.generateQuestion(this.props.starshipsUrls)
  }

  render () {
    return (
      <div>
        <h1>Starships Quiz</h1>
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

StarshipsQuiz.propTypes = {
  starshipsUrls: PropTypes.array
}

export default StarshipsQuiz
