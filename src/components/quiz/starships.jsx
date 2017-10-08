import React, { Component } from 'react'
import { BASE_URL, fetchSwapi, getAllEntriesUrls } from 'lib/swapi'
import { shuffleArray, getRandomUrls } from 'lib/util'
import $ from 'jquery'
import 'bootstrap'

import Choice from './choice'
import Modal from './modal'

import './quiz.css'

class StarshipsQuiz extends Component {
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
    this.generateQuestion(this.state.starshipsUrls)
  }

  async getAllEntriesUrls () {
    const urls = await getAllEntriesUrls(`${BASE_URL}starships/`)
    this.setState({
      starshipsUrls: urls
    })
    return urls
  }

  async generateQuestion (urls) {
    urls = urls || await this.getAllEntriesUrls()

    try {
      const randomUrls = getRandomUrls(urls)
      const [starship, wrong1, wrong2, wrong3] = await Promise.all([fetchSwapi(randomUrls[0]), fetchSwapi(randomUrls[1]), fetchSwapi(randomUrls[2]), fetchSwapi(randomUrls[3])])

      let choices = shuffleArray([starship.manufacturer, wrong1.manufacturer, wrong2.manufacturer, wrong3.manufacturer])

      this.setState({
        question: `What is the manufacturer of ${starship.name}?`,
        answer: starship.manufacturer,
        choices: choices
      })
      // console.log(person, wrong1, wrong2, wrong3)
    } catch (error) {
      console.log('Request failed', error)
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
    this.generateQuestion(this.state.starshipsUrls)
  }

  render () {
    return (
      <div>
        <h1>Starships Quiz</h1>
        <div className='question'>
          <h2>Which manufacturer?</h2>
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
export default StarshipsQuiz
