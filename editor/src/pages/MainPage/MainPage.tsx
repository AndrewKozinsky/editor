import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Loader from '../../common/formElements/Loader/Loader'
import { AppState } from '../../store/rootReduser'
import { UserReducerType } from '../../store/user/userReducer'
// import { useSetTokenStatus } from './js/functions'
import './css/MainPage.scss'

/**
 * Главная страница приложения. В зависимости от наличия авторизации
 * переадресовывает или на страницу входа или в редактор.
 */
function MainPage(): ReactElement {

    // Статус токена
    // const { authTokenStatus } = useSelector<AppState, UserReducerType>(store => store.user)


    // ставить статус токена, считывать цветовую тему, размер интерфейса, язык и так далее.
    // А уже как только эти данные подготовлены, то будет смотреть на какую страницу перекидывать пользователя или оставлять на запрошенной.

    // Установка статуса токена пользователя если он не известен

    // useSetTokenStatus()

    // Если authTokenStatus равен нулю, то не понятно есть ли в браузере токен и верен ли он.
    /*if(authTokenStatus === 0) {
        return (
            <div className='main-page'>
                <Loader />
            </div>
        )
    }*/


    // Если токена нет или он неверный, то пользователь еще не вошёл, перенаправить на страницу входа
    // if(authTokenStatus === 1) return <Redirect to='/enter' />

    // Есть правильный токен. Перенаправить на страницу заметок.
    // return <Redirect to='/editor' />
    return <p>MainPage</p>
}

export default MainPage