import React, { Component, PropTypes } from 'react'
import { RouterContext } from 'react-router'
import { Provider } from 'react-redux'

class UniversalAppContainer extends Component {
  static propTypes = {
    store  : PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    components: PropTypes.array.isRequired,
    createElement: PropTypes.func.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <RouterContext {...this.props}/>
        </div>
      </Provider>
    )
  }
}

export default UniversalAppContainer
