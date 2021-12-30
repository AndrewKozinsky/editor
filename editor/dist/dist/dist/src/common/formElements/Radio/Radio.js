import React, { useState } from 'react';
import { getRandomId } from 'utils/StringUtils';
import './Radio.scss';
/* Компонент выпадающего списка */
export default function Radio(props) {
    const { label, // Подпись выпадающего списка
    name, // Имя группы флагов
    value, // Значение флага
    checked, // Отмечено ли поле
    disabled = false, // Заблокировано ли поле
    onChange, // Обработчик выбора пункта
    onBlur, // Обработчик потерей полем фокуса
     } = props;
    // id для связи подписи и флага
    const [id] = useState(getRandomId());
    // Атрибуты переключателя
    const inputAttribs = {
        type: 'radio',
        name,
        value,
        id,
        checked,
        className: 'radio-input',
        onChange,
    };
    if (onBlur)
        inputAttribs.onBlur = onBlur;
    if (disabled)
        inputAttribs.disabled = true;
    // Атрибуты label
    const labelAttribs = {
        htmlFor: id,
        className: 'radio-label',
    };
    return (React.createElement(React.Fragment, null, React.createElement("input", Object.assign({}, inputAttribs)), React.createElement("label", Object.assign({}, labelAttribs), label)));
}
//# sourceMappingURL=Radio.js.map
//# sourceMappingURL=Radio.js.map
//# sourceMappingURL=Radio.js.map