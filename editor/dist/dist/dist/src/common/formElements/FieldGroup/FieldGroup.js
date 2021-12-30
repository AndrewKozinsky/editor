import React from 'react';
import Radio from '../Radio/Radio';
import Checkbox from '../Checkbox/Checkbox';
import Label from '../Label/Label';
import makeClasses from './FieldGroup-classes';
// TODO Что делает эта функция?
export default function FieldGroup(props) {
    const { label, inputType, groupName, inputsArr, value, gap, vertical = false, disabled = false, // Заблокировано ли поле
    onChange, onBlur } = props;
    const $label = label ? React.createElement(Label, { label: label, bold: true }) : null;
    // Получение типа поля: переключатель или флаг
    let Component = (inputType == 'checkbox') ? Checkbox : Radio;
    return (React.createElement(React.Fragment, null, $label, React.createElement(InputsWrapper, { gap: gap, vertical: vertical }, inputsArr.map((inputData, i) => {
        const attrs = {
            value: inputData.value,
            label: inputData.label,
            name: groupName,
            checked: !!value.includes(inputData.value),
            disabled,
            onChange,
            onBlur
        };
        return React.createElement(Component, Object.assign({}, attrs, { key: i }));
    }))));
}
// TODO Что делает эта функция?
function InputsWrapper(props) {
    const { gap, vertical, children } = props;
    const CN = makeClasses(vertical, gap);
    return React.createElement("div", { className: CN.wrapper }, children);
}
//# sourceMappingURL=FieldGroup.js.map
//# sourceMappingURL=FieldGroup.js.map
//# sourceMappingURL=FieldGroup.js.map