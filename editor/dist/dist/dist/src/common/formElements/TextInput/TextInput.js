import React, { useRef, useState } from 'react';
import { getRandomId } from 'utils/StringUtils';
import InputError from 'common/formElements/InputError/InputError';
import Wrapper from 'common/Wrapper/Wrapper';
import Label from '../Label/Label';
import { useSetFocus } from './TextInput-func';
import makeClasses from './TextInput-classes';
/** Текстовый компонент */
export default function TextInput(props) {
    const { label, // Подпись текстового поля
    inputType = 'text', // Тип поля ввода
    type = 'text', // Тип поля. Варианты: text, email
    name, // Аттрибут name текстового поля
    value, autocomplete = '', // Значение автозаполнения поля
    placeholder, // Текстозаполнитель
    maxWidth, // Максимальная ширина поля
    rows = 5, // Количество рядов у текстового поля
    onChange, // Обработчик изменения поля
    onBlur, // Обработчик потерей полем фокуса
    onKeyDown, // Обработчик нажатия клавиши
    error, disabled = false, // Заблокировано ли поле
    autoFocus = false, // Нужно ли ставить фокус при загрузке
     } = props;
    // Ссылка на элемент чтобы при необходимости поставить фокусировку
    const inputRef = useRef(null);
    // Установка фокусировки при необходомости
    useSetFocus(inputRef, autoFocus);
    // id для связи подписи и поля ввода
    const [id] = useState(getRandomId());
    const CN = makeClasses(maxWidth);
    // Аттрибуты поля
    const inputAttribs = {
        type,
        name,
        value,
        className: CN.root,
        onChange: onChange,
    };
    if (autocomplete)
        inputAttribs.autoComplete = autocomplete;
    if (placeholder)
        inputAttribs.placeholder = placeholder;
    if (onBlur)
        inputAttribs.onBlur = onBlur;
    if (onKeyDown)
        inputAttribs.onKeyDown = onKeyDown;
    return (React.createElement("div", null, React.createElement(Label, { label: label, disabled: disabled, id: id }), inputType === 'text' &&
        React.createElement("input", Object.assign({}, inputAttribs, { disabled: disabled, id: id, ref: inputRef })), inputType === 'textarea' &&
        React.createElement("textarea", Object.assign({}, inputAttribs, { disabled: disabled, id: id, ref: inputRef, rows: rows })), React.createElement(Error, { error: error })));
}
/** Сообщение об ошибке текстового компонента */
function Error(props) {
    // Текст ошибки
    const { error } = props;
    if (!error)
        return null;
    return (React.createElement(Wrapper, { t: 5 }, React.createElement(InputError, { text: error })));
}
//# sourceMappingURL=TextInput.js.map
//# sourceMappingURL=TextInput.js.map
//# sourceMappingURL=TextInput.js.map