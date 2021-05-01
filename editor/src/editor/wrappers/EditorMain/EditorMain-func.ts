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

    // Открыто ли модальное окно
    const isModalOpen = useSelector((store: AppState) => store.modal.isOpen)

    const [classes, setClasses] = useState<string[]>( getClasses(CN, editorSize) )
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {

        // Классы редактора: нормальный вид и отдалённый от зрителя
        const normalClasses = getClasses(CN, editorSize)
        const scaleDownClasses = getClasses(CN, editorSize, 'scaleDown')
        const scaleDownTransparencyClasses = getClasses(CN, editorSize, 'scaleDownTransparent')

        // В зависимости от вида показывать или нормальный вид редактора или отдалённый
        // или он вообще не будет отрисовываться.
        // Если нужно показать редактор
        // Если открыто модальное окно
        if (entryAndEditorViewState === 'editor' && isModalOpen) {
            setIsVisible(true)
            setClasses( scaleDownClasses )
        }
        else if (entryAndEditorViewState === 'editor') {
            setIsVisible(true)
            setClasses( normalClasses )
        }
        // Если нужно показать плавный переход от форм входа к редактору
        else if (entryAndEditorViewState === 'toEditor') {
            setIsVisible(true)
            setClasses( scaleDownTransparencyClasses )
            setTimeout(function () {
                setClasses( normalClasses )
            }, 10)
        }
        // Если нужно показать плавный переход от редактора к формам входа
        else if (entryAndEditorViewState === 'toEntry') {
            setIsVisible(true)
            setClasses( normalClasses )
            setTimeout(function () {
                setClasses( scaleDownTransparencyClasses )
            }, 10)
        }
        // Если нужно показать редактор
        else if (entryAndEditorViewState === 'entry') {
            setIsVisible(false)
            setClasses( scaleDownTransparencyClasses )
        }
        // В противном случае ничего не отрисовывать
        else {
            setIsVisible(false)
            setClasses( scaleDownTransparencyClasses )
        }
    }, [entryAndEditorViewState, isModalOpen])

    return {
        classes: makeCN(classes),
        isVisible
    }
}

/**
 * Функция возращает классы главной обёртки редактора в зависимости от различных значений:
 * @param {String} CN — главный класс обёртки редактора
 * @param {String} editorSize — размер интерфейса
 * @param {String} scaleDownType — тип дополнительного класса:
 * scaleDown — редактор отдалён от зрителя
 * scaleDownTransparent — редактор отдалён от зрителя и прозрачен
 */
function getClasses(
    CN: string,
    editorSize?: StoreSettingsTypes.EditorSize,
    scaleDownType?: 'scaleDown' | 'scaleDownTransparent'
) {
    const classes = [CN, `${CN}--${editorSize}-size`]

    if (scaleDownType === 'scaleDown') classes.push(`${CN}--scale-down`)
    if (scaleDownType === 'scaleDownTransparent') classes.push(`${CN}--scale-down-transparent`)

    return classes
}