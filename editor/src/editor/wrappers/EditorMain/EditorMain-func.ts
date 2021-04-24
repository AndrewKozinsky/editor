import {useSelector} from 'react-redux';
import {AppState} from 'src/store/rootReducer'
import {makeCN} from 'src/utils/StringUtils'
import {useEffect, useState} from 'react'

/**
 * Функция возращает классы главной обёртки редактора
 * @param CN
 */
export function useGetPageClasses(CN: string) {
    // Какой компонент должен быть отрисован
    const { entryAndEditorViewState } = useSelector((store: AppState) => store.settings)

    const [classes, setClasses] = useState<string[]>([CN])
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {

        if (entryAndEditorViewState === 'editor') {
            setIsVisible(true)
            setClasses([CN])
        }
        else if (entryAndEditorViewState === 'toEditor') {
            setIsVisible(true)
            setClasses([CN, `${CN}--scale-down`])
            setTimeout(function () {
                setClasses([CN])
            }, 10)
        }
        else if (entryAndEditorViewState === 'toEntry') {
            setIsVisible(true)
            setClasses([CN])
            setTimeout(function () {
                setClasses([CN, `${CN}--scale-down`])
            }, 10)
        }
        else if (entryAndEditorViewState === 'entry') {
            setIsVisible(false)
            setClasses([CN, `${CN}--scale-down`])
        }
        else {
            setIsVisible(false)
            setClasses([CN, `${CN}--scale-down`])
        }
    }, [entryAndEditorViewState])

    return {
        classes: makeCN(classes),
        isVisible
    }
}