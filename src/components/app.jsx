import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { BASE_URL, getAllEntriesUrls } from 'lib/swapi'

import Homepage from 'components/homepage/homepage'
import PeopleQuiz from 'components/quiz/people'
import StarshipsQuiz from 'components/quiz/starships'
import About from 'components/about/about'
import Nav from 'components/nav/nav'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      peopleUrls: [],
      starshipsUrls: []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount () {
    this.getPeopleUrls()
    this.getStarshipsUrls()
  }

  async getPeopleUrls () {
    const urls = await getAllEntriesUrls(`${BASE_URL}people/`)
    this.setState({
      peopleUrls: urls
    })
  }

  async getStarshipsUrls () {
    const urls = await getAllEntriesUrls(`${BASE_URL}starships/`)
    this.setState({
      starshipsUrls: urls
    })
  }

  render () {
    return (
      <div className='container'>
        <Nav />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/people' render={(props) => (
            <PeopleQuiz {...props} peopleUrls={this.state.peopleUrls} />
          )} />
          <Route path='/starships' render={(props) => (
            <StarshipsQuiz {...props} starshipsUrls={this.state.starshipsUrls} />
          )} />
          <Route path='/about' component={About} />
        </Switch>
      </div>
    )
  }
}

export default App
