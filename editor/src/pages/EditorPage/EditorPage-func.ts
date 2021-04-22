import {useSelector} from 'react-redux';
import {AppState} from 'store/rootReducer'
import {makeCN} from 'utils/StringUtils'
import {useEffect, useState} from 'react';
import actions from '../../store/rootAction';

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