import React, { Component } from 'react'
import Card from '../components/card'

class Widgets extends Component {

  constructor(props) {

    super(props)

    let widgets

    if (__isBrowser__) {
      widgets = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      widgets = props.staticContext
    }

    this.state = {
      loading: widgets && widgets.hasOwnProperty('data') ? false : true,
      widgets
    }

    this.fetchWidgets = this.fetchWidgets.bind(this)
  }

  componentDidMount() {

    const { loading, widgets } = this.state

    if (loading) {
      this.fetchWidgets()
    }
  }

  fetchWidgets() {

    const { fetchInitialData } = this.props
    this.setState(() => ({loading: true}))

    fetchInitialData()
    .then(widgets => this.setState({
      loading: false,
      widgets
    }))
  }

  render() {
    let totalWidgets = 0;
    const { loading, widgets } = this.state
    console.log(this.state)

    if (loading === true) {
      return (<p>'Loading...'</p>)
    }else{
      totalWidgets = widgets.data.length
      return (
        <div>
          {loading && totalWidgets === 0 && <h2>Loading...</h2>}
          {!loading && totalWidgets === 0 && <h2>Empty.</h2>}
          <Card apps={widgets.data} totalapps={totalWidgets} />
        </div>
      )
    }
  }
}

export default Widgets
