import React, {ReactElement} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"

// Страницы
import MainPage from '../../pages/MainPage/MainPage'
import EntrancePages from '../../pages/EntrancePages/EntrancePages'

// JS и CSS
import { useInit } from './js/init'
import './css/reset.css'
import './css/default.scss'
import './css/app.scss'
import Loader from '../../common/formElements/Loader/Loader';


/** Компонент всего приложения */
function App(): ReactElement {
    // TODO В каждом запрове нужно отправлять заголовок Editor-Language.
    // TODO Замени <div className='main-page'> на компонент, которым будешь оборачивать формы авторизации.

    // Проинициализировать приложение возвратить статус сделано ли это
    const isInitialized = useInit()

    return (
        <Router>
            <div className='app'>
                {!isInitialized && <Loader />}
                {isInitialized &&
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
                }
            </div>
        </Router>
    )
}

export default App
