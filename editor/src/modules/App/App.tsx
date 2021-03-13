import React, {ReactElement} from 'react'
// @ts-ignore
import { Switch, Route } from 'react-router-dom'

// Компоненты
import Loader from 'common/misc/Loader/Loader'

// Страницы
// import EditorPage from '../../pages/EditorPage/EditorPage'
// import EntrancePages from '../../pages/EntrancePages/EntrancePages'

// JS и CSS
import { useInit } from './js/init'
import {
    useGetAppClasses,
    useRedirectPage
} from './js/functions'
import './css/reset.css'
import './css/variables.scss'
import './css/default.scss'
import './css/app.scss'


/** Компонент всего приложения */
function App(): ReactElement {
    // TODO Разберись как получить process.env потому что от этого зависит адрес запроса.
    // TODO Сделай карты кода.
    // TODO Разберись почему не работает отладчик.
    // TODO Все обёртки замени на компоненты-обёртки
    // TODO Сделай меню общим компонентом, добавь на страницу.
    // TODO Разделители в форме должны быть общим компонентом. Добавь на страницу.

    // Проинициализировать приложение и возвратить статус сделано ли это
    const isInitialized = useInit()

    // Переадресовать пользователя на другую страницу в зависимости от того
    // пользователь незарегистрирован или зарегистрирован
    useRedirectPage()

    // Классы обёртки компонента
    const appClasses = useGetAppClasses()

    // Показать загрузчик если приложение еще не инициализировалось
    if (!isInitialized) return <div className={appClasses}><Loader /></div>

    return (
        <div className={appClasses}>
            <Switch>
                <Route path='/' exact>
                    {/*<EditorPage />*/}
                    EditorPage
                </Route>
                <Route path='/enter'>
                    {/*<EntrancePages />*/}
                    EntrancePages
                </Route>
                <Route path="*">
                    <p>404</p>
                </Route>
            </Switch>
        </div>
    )
}


export default App
