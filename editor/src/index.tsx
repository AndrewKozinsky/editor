import React from 'react'
import ReactDOM from 'react-dom'
import App from './modules/App/App'
import store from 'store/store'
import { Provider } from 'react-redux'
// @ts-ignore
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
    <Provider store={store}>
        <Router basename={'/editor'}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
)