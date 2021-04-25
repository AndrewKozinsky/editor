import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'src/store/rootReducer'
import {makeCN} from 'src/utils/StringUtils'
import StoreSettingsTypes from 'store/settings/settingsTypes'

/**
 * Функция возращает классы главной обёртки редактора и булево значение нужно ли отрисовывать редактор
 * @param CN
 */
export function useGetPageClasses(CN: string) {

    // Размер элементов интерфейса из Хранилища
    const editorSize = useSelector((store: AppState) => store.settings.editorSize)

    // Какой компонент должен быть отрисован
    const { entryAndEditorViewState } = useSelector((store: AppState) => store.settings)

    const [classes, setClasses] = useState<string[]>( getClasses(CN, editorSize) )
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {

        // Классы редактора: нормальный вид и отдалённый от зрителя
        const normalClasses = getClasses(CN, editorSize)
        const scaleDownClasses = getClasses(CN, editorSize, true)

        // В зависимости от вида показывать или нормальный вид редактора или отдалённый
        // или он вообще не будет отрисовываться.
        // Если нужно показать редактор
        if (entryAndEditorViewState === 'editor') {
            setIsVisible(true)
            setClasses( normalClasses )
        }
        // Если нужно показать плавный переход от форм входа к редактору
        else if (entryAndEditorViewState === 'toEditor') {
            setIsVisible(true)
            setClasses( scaleDownClasses )
            setTimeout(function () {
                setClasses( normalClasses )
            }, 10)
        }
        // Если нужно показать плавный переход от редактора к формам входа
        else if (entryAndEditorViewState === 'toEntry') {
            setIsVisible(true)
            setClasses( normalClasses )
            setTimeout(function () {
                setClasses( scaleDownClasses )
            }, 10)
        }
        // Если нужно показать редактор
        else if (entryAndEditorViewState === 'entry') {
            setIsVisible(false)
            setClasses( scaleDownClasses )
        }
        // В противном случае ничего не отрисовывать
        else {
            setIsVisible(false)
            setClasses( scaleDownClasses )
        }
    }, [entryAndEditorViewState])

    return {
        classes: makeCN(classes),
        isVisible
    }
}

/**
 * Функция возращает классы главной обёртки редактора в зависимости от различных значений:
 * @param {String} CN — главный класс обёртки редактора
 * @param {String} editorSize — размер интерфейса
 * @param {Boolean} addScaleDownClass — должен ли редактор быть отдалён от зрителя
 */
function getClasses(CN: string, editorSize?: StoreSettingsTypes.EditorSize, addScaleDownClass: boolean = false) {
    const classes = [CN, `${CN}--${editorSize}-size`]

    if (addScaleDownClass) classes.push(`${CN}--scale-down`)

    return classes
}