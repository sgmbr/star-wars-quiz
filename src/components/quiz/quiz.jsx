import React from 'react'
import {Route, Switch} from 'react-router-dom'

import PeopleQuiz from 'components/quiz/people'
import StarshipsQuiz from 'components/quiz/starships'

const Quiz = () => (
  <Switch>
    <Route path='/quizpeople' component={PeopleQuiz} />
    <Route path='/quizstarships' component={StarshipsQuiz} />
  </Switch>
)
export default Quiz
