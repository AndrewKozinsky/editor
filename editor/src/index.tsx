import React from 'react'
import ReactDOM from 'react-dom'
import { store } from 'store/rootReducer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './common/App/App'



ReactDOM.render(
    <Provider store={store}>
        <Router basename='/'>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </Router>
    </Provider>,
    document.getElementById('root')
)