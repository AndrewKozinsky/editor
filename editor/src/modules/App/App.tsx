import React, {ReactElement} from 'react'
// @ts-ignore
import { Switch, Route } from 'react-router-dom'

// Компоненты
import Loader from 'common/misc/Loader/Loader'

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
    // TODO Сделай textarea в TextInput
    // TODO Пусть API при подтверждении пароля посылает письмо не на страницу https://editorium.local/api/users/confirmEmail/23d0ab9d1, а на страницу https://editorium.local/editor/confirmEmail/23d0ab9d1, а на ней уже делается запрос на адрес подтверждения почты.
    // TODO Сделай обёртки для флагов и переключателей куда можно передать название группы и расположение полей.
    // TODO Можно сделать компонент Form куда будет передаваться атрибут disabled. Тогда форма плавно будет становиться полупрозрачной чтобы показать, что она неактивная во время отправки запроса. А если ответ придёт быстро, то пользователь почти не заметит, что форма стала полупрозрачной и она тут же вернётся обратно к полной непрозрачности.
    // TODO Сделай документацию как на https://yastatic.net/s3/frontend/lego/storybook/index.html?path=/story/controls-radiobox-desktop--playground
    // TODO Почитай документацию и заодно подключи Yup и с помощью него проверяй поля.
    // TODO Сделай чтобы проверка была после первой отправки формы
    // TODO Как сделаешь все формы собери программу для публикации и проверь в других браузерах.
    // TODO Как сделаешь все формы слей изменения с мастером
    // TODO Не забывай что текстовые поля должны соответствовать предполагаемому количеству вводимых символов. Если будет только три символа, то поле не должно быть на всю ширину.
    // TODO Сделай страницу 404 по макету.
    // TODO Мне кажется будет прикольно сделать анимированное появление box-shadow при фокусе на поле ввода. Но наскоком у меня это сделать не получилось. Очевидно нужно оборачивать все поля в обёртку и задавать уже ей необходимые стили и плавные переходы.
    // TODO Может сделать трёхмерную анимацию появления редактора и скрытия окна регистрации?
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
    if (!isInitialized) return <div className={appClasses}><Loader /></div>

    return (
        <div className={appClasses}>
            <Switch>
                <Route path='/' exact>
                    <EditorPage />
                </Route>
                <Route path='/enter'>
                    <EntrancePages />
                </Route>
                <Route path="*">
                    <p>404</p>
                </Route>
            </Switch>
        </div>
    )
}


export default App
