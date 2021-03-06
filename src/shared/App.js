import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { withCookies, Cookies } from 'react-cookie'
import { withRouter } from 'react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import { instanceOf, PropTypes } from 'prop-types'
import * as actions from './actions/index'
import Navbar from './components/Navbar'
import { Routes } from './routes'
import NotFound from './pages/NotFound'

// Hello

class App extends Component {

  constructor(props) {

    super(props)

    const { account, apps } = props


    this.state = {
      accountIsInSession: Object.keys(account).length !== 0,
      account: account,
      apps: apps
    }

  }

  render() {
    const { accountIsInSession, account } = this.state

    return (
      <div>
        <Navbar {...this.props} />
        <Switch>
          // Attempt to find a matching Route
          {Routes.map(({ path, exact, component: C, isPrivate = false, ...rest}) => {
            return <Route key={path} path={path} exact
              render={props => (<C {...props} {...rest} {...this.props} />)} />
          })}
          // If not route is returned above, this executes
          <Route render={props => (<NotFound {...props} />)} />
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  account: PropTypes.object.isRequired,
  cookies: instanceOf(Cookies).isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    // Top Level State to control 2nd level components
    account: state.account,
    apps: state.apps
  }),
  mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })

export default withRouter(withCookies(connect(mapStateToProps, mapDispatchToProps)(App)))
