import React, {ReactElement} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom"

// Компоненты
import Loader from '../../common/misc/Loader/Loader'

// Страницы
import EditorPage from '../../pages/EditorPage/EditorPage'
import EntrancePages from '../../pages/EntrancePages/EntrancePages'

// JS и CSS
import { useInit } from './js/init'
import {
    useGetAppClasses,
    useGetRedirectPageAddress
} from './js/functions'
import './css/reset.css'
import './css/default.scss'
import './css/app.scss'




/** Компонент всего приложения */
function App(): ReactElement {
    // TODO Реализуй тёмную тему.
    // TODO В каждом запросе нужно отправлять заголовок Editor-Language.

    // Проинициализировать приложение и возвратить статус сделано ли это
    const isInitialized = useInit()

    // Получение адреса на который нужно переадресовать пользователя
    // если пользователь незарегистрирован или зарегистрирован
    const redirectPageAddress = useGetRedirectPageAddress()

    // Классы обёртки компонента
    const appClasses = useGetAppClasses()

    // Показать загрузчик если приложение еще не инициализировалось
    if (!isInitialized) return <div className={appClasses}><Loader /></div>

    // Если есть адрес переадресации, то перебросить на другую страницу
    if (redirectPageAddress) {
        return <Router><Redirect to={redirectPageAddress} /></Router>
    }

    return (
        <Router>
            <div className={appClasses}>
                <Switch>
                    <Route path='/' exact>
                        <EditorPage />
                    </Route>
                    <Route path='/'>
                        <EntrancePages />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}


export default App
