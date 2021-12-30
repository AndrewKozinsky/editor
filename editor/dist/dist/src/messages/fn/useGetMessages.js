import useGetSettingsSelectors from 'store/settings/settingsSelectors';
/**
 * Хук принимает объект с текстами на разных языках и возвращает объект с текстами на текущем языке.
 * @param {Object} obj — объект с текстами на разных языках
 */
export default function useGetMessages(obj) {
    const { editorLanguage } = useGetSettingsSelectors();
    const objNext = {};
    for (let key in obj) {
        // @ts-ignore
        objNext[key] = obj[key][editorLanguage];
    }
    return objNext;
}
//# sourceMappingURL=useGetMessages.js.map
//# sourceMappingURL=useGetMessages.js.map