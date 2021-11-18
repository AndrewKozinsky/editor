import {useEffect, useState} from 'react'
import { makeCN } from 'utils/StringUtils'
import useGetSettingsSelectors from 'store/settings/settingsSelectors'
import '../css/app.scss'

const appRootClass = 'app'

// Хук формирует объект классов компонента App
function useGetClasses() {
    // Получение классов корневого тега
    const appRootClass = useGetAppClasses()

    return {
        // Классы корневого тега
        root: appRootClass
    }
}

/** Хук возвращает классы обёртки компонента App */
export function useGetAppClasses() {

    // Получение текущей темы интерфейса и вида (вход в редактор или редактор)
    const { editorTheme, entryAndEditorViewState } = useGetSettingsSelectors()

    const [classes, setClasses] = useState<string[]>([])

    useEffect(function() {
        let classesCopy = [appRootClass]
        if (editorTheme === 'dark') classesCopy.push('dark-theme')

        if (entryAndEditorViewState === 'toEntry' || entryAndEditorViewState === 'entry') {
            classesCopy.push(appRootClass + '--second-bg')
        }

        setClasses( classesCopy )
    }, [editorTheme, entryAndEditorViewState])

    return makeCN(classes)
}

export default useGetClasses