import { ReactElement } from 'react'
import useGetSettingsSelectors from 'store/settings/settingsSelectors'

/**
 * Хук принимает объект с текстами на разных языках и возращает объект с текстами на текущем языке.
 * @param {Object} obj — объект с текстами на разных языках
 */
export default function useGetMessages<T>(obj: T) {
    const {editorLanguage} = useGetSettingsSelectors()

    type MessagesLangObjType = {
        [K in keyof T]: string | ReactElement
    }

    const objNext = {} as MessagesLangObjType

    for (let key in obj) {
        // @ts-ignore
        objNext[key] = obj[key][editorLanguage]
    }

    return objNext
}
