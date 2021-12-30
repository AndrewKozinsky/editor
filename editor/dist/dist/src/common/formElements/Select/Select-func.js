import React from 'react';
/**
 * Функция возвращает массив тегов <option>
 * @param {Array} options — массив пунктов выпадающего списка
 */
export function getOptions(options) {
    // Генерация массива тегов <option>
    return options.map(function (option, i) {
        // Атрибуты <option>
        const optionAttrs = {
            value: option.value,
            key: i
        };
        // Если <option> заблокирован
        if (option.disabled)
            optionAttrs.disabled = true;
        return React.createElement("option", Object.assign({}, optionAttrs), option.label);
    });
}
//# sourceMappingURL=Select-func.js.map
//# sourceMappingURL=Select-func.js.map