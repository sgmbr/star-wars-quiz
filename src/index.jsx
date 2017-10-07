import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import 'index.scss'
import Homepage from 'components/homepage/homepage'
import Quiz from 'components/quiz/quiz'
import About from 'components/about/about'
import Nav from 'components/nav/nav'

ReactDOM.render(
  <Router>
    <div className='container-fluid'>
      <Nav />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/quiz' component={Quiz} />
        <Route path='/about' component={About} />
      </Switch>
    </div>
  </Router>, document.getElementById('app'))
