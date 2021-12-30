import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Компоненты
import Loader from 'common/misc/Loader/Loader';
import NotFound from '../NotFound/NotFound';
// Страницы
import EditorMain from 'editor/wrappers/EditorMain/EditorMain';
import EntrancePages from 'entrance/EntrancePages/EntrancePages';
// JS и CSS
import { useGetAndSetEditorSettings, useGetUserDataAndStatus } from './app-fn/init';
import { useRedirectPage } from './app-fn/App-func';
// import setShortcutsHandler from './shortcuts/shortcutsHandler'
import useGetClasses from './app-fn/App-classes';
/** Компонент всего приложения */
export default function App() {
    // TODO При создании нового файла сделай чтобы в поле названия статьи стояло какое-то значение.
    // TODO Папкам в DragFilesTree придётся задать строковые идентификаторы вида folder_12 чтобы не было пересечения с числовыми идентификаторами у файлов.
    // TODO В GET нельзя передать тело запроса, но дополнительные данные можно передать через запросы в URL: /compFolder?siteId=3. Поэтому я могу убрать обработчик /sites/3/compFolder из sites.
    // TODO На iFrame можно поставить какой-нибудь идентификатор, например #editorium чтобы в используемом CSS как-то изменять стили если статью редактируют в редакторе. Например добавить какой-нибудь фон чтобы элемент был виден только в редакторе или поставить минимальную высоту чтобы элемент можно было выделить если он имеет нулевую высоту.
    // TODO В некоторых местах кода я формирую объект свойств, который затем передаю через оператор rest в тег в JSX. И в качестве типа пишу MiscTypes.StringKeyWithAnyValues потому что объект со свойствами формируется не сразу, а может дополняться по ходу кода. Поэтому я не могу зайдействовать автоматическое определение кода TypeScript-а. Так вот, в качестве типа этого объекта можно указать тип свойств принимаемых тегом. Не знаю как он называется.
    // TODO Figure out why the types from Store are not detected.
    // TODO Don't forgot to use eslint, prettier and stylelint.
    // TODO MAYBE BETTER USE ORDINARY JSON INSTEAD JSON6 BECAUSE IT WORKS BADLY WITH ARRAYS
    // TODO If I have two Grid components and I put an image to the second grid's cell it appears in the first.
    // TODO Use a more specific name instead of id in the article data.
    // TODO User must pass array of objects with data about including files instead a single string.
    // TODO You didn't consider when user types text and element expands. Then flashed rectangle doesn't match element size. Yet it pages was is scrolled flashed rectangle set on a wrong position. Yet flashed rectangle set on a wrong position if pages is scrolled.
    // TODO Можно все запросы связанные с компонентами, которые зависимы от сайта (получение компонентов сайта, удаление компонента сайта и так далее) перенести в контроллер сайта. Так получится логичнее.
    // TODO Надо сделать отдельные файлы с типами присылаемых с сервера данных: сайт, компонент, шаблон файлов, статью и использовать их для типизации запросов.
    // TODO You can plug in Prettier and TSLint
    // TODO Уточни в каком формате приходит список сайтов в editor/requests/sitesRequest.ts
    // TODO If a request for model data depends on site then you have to include site/:siteId in address.
    // TODO Если в сайте создать шаблоны компонентов, затем сайт удалить и перейти на вкладку шаблонов компонентов, то там будет форма редактирования существующего компонента потому что в localStorage остались данные по этому выделенному компоненту. Конечно при удалении сайта можно удалять из localStorage свойства  editorComponentType, editorComponentId и editorSiteTemplateId, но возможно они принадлежат компонентам сайта. Поэтому это не лучшее решение. Подумай как сделать чтобы при удалении сайта из localStorage удалялись данные относящиеся к нему.
    // TODO Сделай на вкладке сайта выпадающей список с шаблонами и выбранным шаблоном по умолчанию.
    // TODO Добавь useCallback всем хукам где это требуется.
    // TODO Сделай документацию как на https://yastatic.net/s3/frontend/lego/storybook/index.html?path=/story/controls-radiobox-desktop--playground
    // TODO Не забывай что текстовые поля должны соответствовать предполагаемому количеству вводимых символов. Если будет только три символа, то поле не должно быть на всю ширину.
    // TODO Надо бы в базе данных в коллекций сделать даты создания. Это потребуется при сортировке материалов в будущем.
    // TODO Все useDispatch() можно заменить на store.dispatch() ради краткости
    // TODO После отправки формы на странице подтверждения почты программа перенаправит на страницу редактора. Но на полсекунды появится форма входа, которая затем растворится. Из-за этого возникает рваная анимация. Еще в Консоле есть ошибка Реакта. Это нужно исправить.
    // TODO Посмотри можно ли useHandleConfirmChangingEmailModal() заменить на универсальную useGetShowModal()
    // TODO Better disable form when data loads: when they submit form or download data because tab switch
    // https://stackoverflow.com/questions/50651856/iframe-problems-script-src-not-loaded-at-all
    // TODO ПОСМОТРИ В БУДУЩЕМ-------------------------
    // TODO Попробуй сделать чтобы во всех формах где требуется написать пароль браузер его бы подставлял. Можно посмотреть как это сделано на других сайтах.
    // TODO Думаю в FormHandler-е нужно сделать свойство где будет храниться название поля у которого произошло событие. Продумай это.
    // TODO Не смог сделать вложенный адрес вида editor/first/second. Поэтому страницы ввода нового пароля и подтверждения почты сделал по-другому.
    // TODO Мне кажется будет прикольно сделать анимированное появление box-shadow при фокусе на поле ввода. Но наскоком у меня это сделать не получилось. Очевидно нужно оборачивать все поля в обёртку и задавать уже ей необходимые стили и плавные переходы.
    // TODO Из http://videolab.online/ можно стащить соглашения об использовании сервиса
    // TODO Периодически добавляй useCallback во все места где это требуется.
    // TODO В полях ввода есть повторяющиеся функции и хуки. Можно такие функции занести в отдельный файл.
    // TODO Watch how well the script set key value while build article. May be it may to optimize.
    // Shift + F6 // Переименовывание всех переменных разом
    // Cmd - / Cmd + // Сворачивание / разворачивание стека
    // Alt + Cmd + T // Оборачивание выделенных тегов в HTML  или в конструкцию if ... else, while, for...в JS
    // Shift + Cmd + Fn + Del // Удаление оберни в HTML или  if ... else, while, for... в JS
    // Поставить настройки редактора в Хранилище
    useGetAndSetEditorSettings();
    // Проинициализировать приложение и возвратить статус сделано ли это
    const isUserDataReceived = useGetUserDataAndStatus();
    // Установка обработчика горячих клавиш при запуске приложения
    // setShortcutsHandler()
    // Переадресовать пользователя на другую страницу в зависимости от того
    // зарегистрирован он или нет
    useRedirectPage();
    // Классы компонента
    const CN = useGetClasses();
    // Показать загрузчик если приложение еще не проинициализировалось
    if (!isUserDataReceived) {
        return React.createElement("div", { className: CN.root }, React.createElement(Loader, null));
    }
    return (React.createElement("div", { className: CN.root }, React.createElement(Switch, null, React.createElement(Route, { path: ['/', '/enter', '/reg', '/reset-password', '/change-reset-password', '/confirm-email'], exact: true }, React.createElement(EditorMain, null), React.createElement(EntrancePages, null)), React.createElement(Route, { path: "*" }, React.createElement(NotFound, null)))));
}
//# sourceMappingURL=App.js.map
//# sourceMappingURL=App.js.map
//# sourceMappingURL=App.js.map