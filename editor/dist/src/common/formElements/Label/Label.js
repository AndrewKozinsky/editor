import React from 'react';
import makeClasses from './Label-classes';
/** Компонент подписи полей формы */
export default function Label(props) {
    const { label, // Подпись поля ввода
    id, // id поля ввода
    bold = false, // Должен ли текст быть жирным
    disabled = false // Заблокировано ли поле
     } = props;
    if (!label)
        return null;
    const CN = makeClasses(disabled, bold);
    // Атрибуты label
    const labelAttrs = {};
    // Классы подписи
    labelAttrs.className = CN.root;
    // Добавить атрибут for равный id поля к которому должна быть привязана подпись
    if (id)
        labelAttrs.htmlFor = id;
    return React.createElement("label", Object.assign({}, labelAttrs), label);
}
//# sourceMappingURL=Label.js.map