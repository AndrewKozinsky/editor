var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from 'react';
import { store } from 'store/rootReducer';
/** Хук загружающий данные с сервера
 * @param {String} url — строка c адресом запроса
 * @param {Object} options — параметры запроса
 */
export function useFetch(url, options) {
    // Идёт ли сейчас загрузка
    const [isLoading, setIsLoading] = useState(false);
    // Загруженные данные
    const [data, setData] = useState(null);
    // Значение ошибки
    const [error, setError] = useState(false);
    // Язык интерфейса
    const lang = store.getState().settings.editorLanguage;
    // Функция запускающая процесс загрузки данных с сервера
    function doFetch() {
        setIsLoading(true);
    }
    useEffect(function () {
        // Если загрузка не требуется, то ничего не делать
        if (!isLoading)
            return;
        // Добавление заголовка языка интерфейса в параметры запроса
        const extraOptions = setExtraOptions(options, lang);
        try {
            fetch(url, extraOptions)
                .then(rowData => rowData.json())
                .then(jsonData => {
                setIsLoading(false);
                setData(jsonData);
            });
        }
        catch (err) {
            setIsLoading(false);
            setError(err);
        }
    }, [isLoading]);
    return {
        isLoading,
        data,
        error,
        doFetch
    };
}
/** Функция загружающая данные с сервера
 * @param {String} url — строка c адресом запроса
 * @param {Object} options — параметры запроса
 */
export function makeFetch(url, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const lang = store.getState().settings.editorLanguage;
        // Добавление заголовка языка интерфейса в параметры запроса
        const extraOptions = setExtraOptions(options, lang);
        try {
            const rowData = yield fetch(url, extraOptions);
            return yield rowData.json();
        }
        catch (err) {
            let message = `Couldn't get data.`;
            if (lang === 'rus')
                message = 'Не удалось получить данные.';
            throw new Error(message);
        }
    });
}
/**
 * Функция добавляет в объект параметров запроса заголовок Editor-Language с языком
 * @param {Object} optionsObj — объект параметров запроса
 * @param {String} lang — язык интерфейса пользователя
 */
function setExtraOptions(optionsObj, lang = 'eng') {
    return Object.assign(Object.assign({}, optionsObj), { headers: Object.assign(Object.assign({}, optionsObj.headers), { 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8', 'Editor-Language': lang }) });
}
//# sourceMappingURL=fetch.js.map
//# sourceMappingURL=fetch.js.map