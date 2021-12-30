import React, { useState } from 'react';
import { getOptions } from './Select-func';
import { getRandomId } from 'utils/StringUtils';
import makeClasses from './Select-classes';
import Label from '../Label/Label';
import SvgIcon from '../../icons/SvgIcon';
/* Компонент выпадающего списка */
export default function Select(props) {
    const { label, // Подпись выпадающего списка
    name, // Имя выпадающего списка
    value, // Выбранное значение выпадающего списка
    options, // Массив для генерации тегов <option>
    onChange, // Обработчик выбора пункта
    onBlur, // Обработчик потерей полем фокуса
    disabled = false, // Заблокировано ли поле
     } = props;
    // Находится ли выпадающий список под фокусом
    const [isFocus, setIsFocus] = useState(false);
    // id для связи подписи и поля ввода
    const [id] = useState(getRandomId());
    const CN = makeClasses(isFocus, disabled);
    // Атрибуты поля
    const inputAttribs = {
        name,
        className: 'select-input',
        value: value || '',
        onFocus: () => setIsFocus(true),
        onBlur: (e) => {
            // Поставить статус сфокусированности в Состояние
            setIsFocus(false);
            // Если передали обработчик потерей фокуса, то запустить
            if (onBlur)
                onBlur(e);
        },
        onChange
    };
    // Если есть подпись, то добавить id чтобы связать подпись и выпадающий список
    if (label)
        inputAttribs.id = id;
    if (disabled)
        inputAttribs.disabled = true;
    return (React.createElement(React.Fragment, null,
        React.createElement(Label, { label: label, id: id }),
        React.createElement("div", { className: CN.wrapper },
            React.createElement("select", Object.assign({}, inputAttribs), getOptions(options)),
            React.createElement("div", { className: CN.wrapperTip },
                React.createElement(SvgIcon, { type: 'selectInputArrows', baseClass: '-icon-stroke' })))));
}
//# sourceMappingURL=Select.js.map