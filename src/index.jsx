import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import 'index.scss'
import Homepage from 'components/homepage/homepage'
import PeopleQuiz from 'components/quiz/people'
import StarshipsQuiz from 'components/quiz/starships'
import About from 'components/about/about'
import Nav from 'components/nav/nav'

ReactDOM.render(
  <Router>
    <div className='container'>
      <Nav />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/people' component={PeopleQuiz} />
        <Route path='/starships' component={StarshipsQuiz} />
        <Route path='/about' component={About} />
      </Switch>
    </div>
  </Router>, document.getElementById('app'))
