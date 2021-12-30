import { useEffect } from 'react';
/**
 * Хук при необходимости устанавливает фокус на поле ввода
 * @param {Object} inputRef — ссылка на элемент
 * @param {Boolean | Number} autoFocus — или булево значение нужно ли ставить фокусировку или число сообщающее задержку,
 * с которой нужно поставить фокусировку.
 */
export function useSetFocus(inputRef, autoFocus) {
    // Нужно ли ставить фокусировку
    useEffect(function () {
        var _a;
        // Если нужно ставить фокусировку
        if (autoFocus === true) {
            (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
        // Если нужно поставить фокусировку с некоторой задержкой
        else if (typeof autoFocus === 'number') {
            setTimeout(function () { inputRef.current.focus(); }, autoFocus);
        }
    }, []);
}
//# sourceMappingURL=TextInput-func.js.map
//# sourceMappingURL=TextInput-func.js.map
//# sourceMappingURL=TextInput-func.js.map