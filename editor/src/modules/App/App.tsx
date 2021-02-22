import React, {ReactElement} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"

// Страницы
import MainPage from '../../pages/MainPage/MainPage'

// CSS
import './css/reset.css'
import './css/default.scss'
import './css/app.scss'
import EntrancePages from '../../pages/EntrancePages/EntrancePages'


function App(): ReactElement {
    return (
        <Router>
            <div className='app'>
                <Switch>
                    <Route path='/' exact>
                        <MainPage />
                    </Route>
                    <Route path='/(reg|enter|forgot-password)'>
                        <EntrancePages />
                    </Route>
                    <Route path='/reset-password/:token'>
                        <EntrancePages />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
