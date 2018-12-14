import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {
  constructor(props) {

    super(props)

  }

  componentDidMount(){
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {

          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');

        });
      });
    }
  }

  render() {
    const { account, actions } = this.props,
      accountIsInSession = Object.keys(account).length !== 0,
      links = [
          {
            exact: true,
            name: 'Home',
            path: '/'
          },
          {
            name: 'Widgets',
            path: '/widgets',
          },
          {
            name: 'Account',
            path: '/account',
          }
        ]

    return (
      <nav className='navbar' role='navigation' aria-label="main navigation">
        <div className='navbar-brand'>

          <a className="navbar-item">
            <img src='./assets/img/logo.jpg' width="28" height="28"/>
          </a>

          <a role="button"
            className="navbar-burger burger"
            data-target='navMenu'
            aria-label="menu"
            aria-expanded="false">

            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>

          </a>

        </div>
        <div className ='navbar-menu' id='navMenu'>
          <div className ='navbar-start'>
            {links.map(({ exact, name, path }) => (
              <NavLink exact key={path} className="navbar-item" activeStyle={{fontWeight: 'bold'}} to={`${path}`}>
                {name}
              </NavLink>
            ))}
          </div>
          <div className='navbar-end'>
            <div className='navbar-item'>
                <div className='buttons'>
                  {!accountIsInSession
                    ? <NavLink className='button is-primary' activeStyle={{fontWeight: 'bold'}} to='/login'>Login</NavLink>
                    : <a href="" className='button' onClick={actions.logout}>Logout</a>
                  }
                </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
