import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
  render () {
    return (
      <div className='row'>
        <div className='col'>
          <ul className='nav nav-pills mb-3'>
            <li className='nav-item'>
              <NavLink to='/' className='nav-link' activeClassName='active' exact>Home</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/quiz/people' className='nav-link' activeClassName='active'>People Quiz</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/quiz/starships' className='nav-link' activeClassName='active'>Starships Quiz</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/about' className='nav-link' activeClassName='active'>About</NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Nav
