import React from 'react'
import ReactDOM from 'react-dom'
import { store } from 'store/rootReducer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './common/App/App'

// Может обернуть в <React.StrictMode>?
ReactDOM.render(
    <Provider store={store}>
        <Router basename='/editor'>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
)