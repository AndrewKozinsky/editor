import React, { useRef } from 'react';
import useGetSettingsSelectors from 'store/settings/settingsSelectors';
import Loader from 'common/misc/Loader/Loader';
import { useSetFocus } from './Button-func';
import makeClasses from './Button-classes';
import SvgIcon from '../../icons/SvgIcon';
/** Компонент кнопки */
export default function Button(props) {
    let { type = 'button', // Тип кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
    view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
    color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
    icon, // Тип значка
    text, // Текст на кнопке
    name, // Атрибут name кнопки
    disabled = false, // Заблокирована ли кнопка
    loading = false, // Нужно ли на кнопке рисовать загрузчик
    onClick, id, autoFocus = false, // Нужно ли ставить фокус при загрузке
     } = props;
    // Язык интерфейса
    const { editorLanguage } = useGetSettingsSelectors();
    // Ссылка на элемент
    const buttonRef = useRef(null);
    // Установка фокусировки при необходомости
    useSetFocus(buttonRef, autoFocus);
    // Текст кнопки
    let btnText = null;
    if (view !== 'onlyIcon' && text)
        btnText = text;
    // При загрузке поменять текст кнопки
    if (btnText && loading) {
        if (editorLanguage === 'eng')
            btnText = 'Sending...';
        if (editorLanguage === 'rus')
            btnText = 'Отправка...';
    }
    // Если включена загрузка, то заблокировать кнопку и убрать значёк
    if (loading) {
        disabled = true;
        icon = undefined;
    }
    const CN = makeClasses(props);
    // Атрибуты кнопки
    const btnAttrs = {
        type,
        className: CN.root,
        disabled: disabled,
        ref: buttonRef
    };
    if (name)
        btnAttrs.name = name;
    if (onClick)
        btnAttrs.onClick = onClick;
    if (id)
        btnAttrs.id = id;
    return (React.createElement("button", Object.assign({}, btnAttrs),
        React.createElement(ButtonIcon, { iconType: icon, color: color, CN: CN }),
        React.createElement(ButtonLoader, { loading: loading }),
        btnText));
}
/* Значок на кнопке */
function ButtonIcon(props) {
    const { iconType, color, CN } = props;
    if (!iconType)
        return null;
    const attrs = {
        type: iconType,
        baseClass: '-icon-fill',
        extraClass: CN.icon
    };
    if (color === 'accent') {
        attrs.baseClass = '-white-fill';
    }
    return React.createElement(SvgIcon, Object.assign({}, attrs));
}
/** Компонент загрузчика кнопки */
function ButtonLoader(props) {
    const { loading = false } = props;
    if (!loading)
        return null;
    return React.createElement(Loader, { className: 'btn-loader' });
}
//# sourceMappingURL=Button.js.map