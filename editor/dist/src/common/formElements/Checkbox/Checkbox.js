import React, { useState } from 'react';
import { getRandomId } from 'utils/StringUtils';
import './Checkbox.scss';
/* Checkbox component */
export default function Checkbox(props) {
    const { label, // Подпись выпадающего списка
    name, // Имя группы флагов
    value, // Значение флага
    disabled = false, // Заблокировано ли поле
    checked, // Отмечено ли поле
    onChange, // Обработчик выбора пункта
    onBlur, // Обработчик потерей полем фокуса
     } = props;
    // id для связи подписи и флага
    const [id] = useState(getRandomId());
    // Атрибуты флага
    const inputAttribs = {
        type: 'checkbox',
        name,
        value,
        id,
        checked,
        className: 'checkbox-input',
        onChange
    };
    if (onBlur)
        inputAttribs.onBlur = onBlur;
    if (disabled)
        inputAttribs.disabled = true;
    // Атрибуты label
    const labelAttribs = {
        htmlFor: id,
        className: 'checkbox-label',
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("input", Object.assign({}, inputAttribs)),
        React.createElement("label", Object.assign({}, labelAttribs), label)));
}
//# sourceMappingURL=Checkbox.js.map