import React, {ReactElement} from 'react'
// @ts-ignore
import { Switch, Route } from 'react-router-dom'

// Компоненты
import Loader from 'common/misc/Loader/Loader'
import NotFound from '../NotFound/NotFound'

// Страницы
import EditorMain from 'editor/wrappers/EditorMain/EditorMain'

import EntrancePages from 'modules/auth/EntrancePages/EntrancePages'
// JS и CSS
import { useInit } from './js/init'
import { useGetAppClasses, useRedirectPage } from './js/App-func'
import useSetShortcutsHandler from './js/setShortcutsHandler'
import './css/reset.css'
import './css/variables.scss'
import './css/default.scss'
import './css/app.scss'


/** Компонент всего приложения */
export default function App(): ReactElement {
    // TODO Сделай возможность удалять сайты
    // TODO Добавь useCallback всем хукам где это требуется.
    // TODO Сделай textarea в TextInput
    // TODO Сделай документацию как на https://yastatic.net/s3/frontend/lego/storybook/index.html?path=/story/controls-radiobox-desktop--playground
    // TODO Не забывай что текстовые поля должны соответствовать предполагаемому количеству вводимых символов. Если будет только три символа, то поле не должно быть на всю ширину.
    // TODO Надо бы в базе данных в коллекций сделать даты создания. Это потребуется при сортировке материалов в будущем.
    // TODO Все useDispatch() можно заменить на store.dispatch() ради краткости


    // TODO ПОСМОТРИ В БУДУЩЕМ-------------------------
    // TODO Попробуй сделать чтобы во всех формах где требуется написать пароль браузер его бы подставлял. Можно посмотреть как это сделано на других сайтах.
    // TODO Думаю в FormHandler-е нужно сделать свойство где будет храниться название поля у которого произошло событие. Продумай это.
    // TODO Не смог сделать вложенный адрес вида editor/first/second. Поэтому страницы ввода нового пароля и подтверждения почты сделал по-другому.
    // TODO Мне кажется будет прикольно сделать анимированное появление box-shadow при фокусе на поле ввода. Но наскоком у меня это сделать не получилось. Очевидно нужно оборачивать все поля в обёртку и задавать уже ей необходимые стили и плавные переходы.
    // TODO Из http://videolab.online/ можно стащить соглашения об использовании сервиса
    // TODO Переодически добавляй useCallback во все места где это требуется.
    // TODO В полях ввода есть повторяющиеся функции и хуки. Можно такие функции занести в отдельный файл.
    // Shift + F6 // Переименовывание всех переменных разом
    // Cmd - / Cmd + // Сворачивание / разворачивание стека
    // Alt + Cmd + T // Оборачивание выделенных тегов в HTML  или в конструкцию if ... else, while, for...в JS
    // Shift + Cmd + Fn + Del // Удаление оберти в HTML или  if ... else, while, for... в JS

    // Проинициализировать приложение и возвратить статус сделано ли это
    const isInitialized = useInit()

    // Установка обработчика горячих клавиш при запуске приложения
    useSetShortcutsHandler()

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
                    <EditorMain />
                    <EntrancePages />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </div>
    )
}
