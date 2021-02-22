import React, {ReactElement} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"

// CSS
import './css/reset.css'
import './css/default.scss'


function App(): ReactElement {
    return (
        <Router>
            <div className='app'>
                <Switch>
                    <Route path='/' exact>
                        <p>Main</p>
                    </Route>
                    <Route path='/editor'>
                        <p>Editor</p>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
