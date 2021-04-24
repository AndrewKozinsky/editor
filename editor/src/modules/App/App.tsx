import React, {ReactElement} from 'react'
// @ts-ignore
import { Switch, Route } from 'react-router-dom'

// Компоненты
import Loader from 'common/misc/Loader/Loader'
import NotFound from '../NotFound/NotFound'

// Страницы
import EditorPage from 'pages/EditorPage/EditorPage'

import EntrancePages from 'pages/EntrancePages/EntrancePages'
// JS и CSS
import { useInit } from './js/init'
import { useGetAppClasses, useRedirectPage } from './js/App-func'
import './css/reset.css'
import './css/variables.scss'
import './css/default.scss'
import './css/app.scss'


/** Компонент всего приложения */
function App(): ReactElement {
    // TODO Можно сделать общие сообщения об ошибках. Например про обязательное поле или пароли. Чтобы не писать один и тот же текст несколько раз.
    // TODO Считаю папку pages нужно ликвидировать. Она избыточна. Подумай как лучше сформировать структуру папок.
    // TODO Как сделаешь все формы собери программу для публикации и проверь в других браузерах.
    // TODO Как сделаешь все формы слей изменения с Мастером


    // TODO Сделай textarea в TextInput
    // TODO Сделай вкладки в редакторе
    // TODO Сделай обёртки для флагов и переключателей куда можно передать название группы и расположение полей.
    // TODO Сделай документацию как на https://yastatic.net/s3/frontend/lego/storybook/index.html?path=/story/controls-radiobox-desktop--playground
    // TODO Не забывай что текстовые поля должны соответствовать предполагаемому количеству вводимых символов. Если будет только три символа, то поле не должно быть на всю ширину.

    // TODO ПОСМОТРИ В БУДУЩЕМ-------------------------
    // TODO Думаю общими значками должны считаться только те значки, которые действительно используются в нескольких местах. Если значёк используется в одном месте, то и храни его в папке этого компонента.
    // TODO Думаю в FormHandler-е нужно сделать свойство где будет храниться название поля у которого произошло событие. Продумай это.
    // TODO Не смог сделать вложенный адрес вида editor/first/second. Поэтому страницы ввода нового пароля и подтверждения почты сделал по-другому.
    // TODO Мне кажется будет прикольно сделать анимированное появление box-shadow при фокусе на поле ввода. Но наскоком у меня это сделать не получилось. Очевидно нужно оборачивать все поля в обёртку и задавать уже ей необходимые стили и плавные переходы.
    // Shift + F6 // Переименовывание всех переменных разом
    // Cmd - / Cmd + // Сворачивание / разворачивание стека
    // Alt + Cmd + T // Оборачивание выделенных тегов в HTML  или в конструкцию if ... else, while, for...в JS
    // Shift + Cmd + Fn + Del // Удаление оберти в HTML или  if ... else, while, for... в JS


    // Проинициализировать приложение и возвратить статус сделано ли это
    const isInitialized = useInit()

    // Переадресовать пользователя на другую страницу в зависимости от того
    // пользователь незарегистрирован или зарегистрирован
    useRedirectPage()

    // Классы обёртки компонента
    const appClasses = useGetAppClasses()

    // Показать загрузчик если приложение еще не инициализировалось
    if (!isInitialized) {
        return <div className={appClasses}><Loader /></div>
    }

    return (
        <div className={appClasses}>
            <Switch>
                <Route path={['/', '/enter', '/reg', '/reset-password', '/change-reset-password', '/confirm-email']} exact>
                    <EditorPage />
                    <EntrancePages />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </div>
    )
}


export default App
