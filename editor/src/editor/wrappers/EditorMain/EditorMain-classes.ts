import { useEffect, useState } from 'react'
import { makeCN } from 'utils/stringUtils'
import useGetSettingsSelectors from 'store/settings/settingsSelectors'
import './EditorMain.scss'


const CN = 'editor-main'

/** Функция возвращающая классы элементов */
export default function useMakeClasses() {
    const rootClass = useGetRootClass()

    return {
        root: rootClass,
        leftPart: CN + '__left',
        rightPart: CN + '__right'
    }
}


/** Функция возвращает классы главной обёртки редактора */
export function useGetRootClass() {

    // Какой компонент должен быть отрисован
    const { entryAndEditorViewState } = useGetSettingsSelectors()

    const [classes, setClasses] = useState<string[]>( getClasses() )

    useEffect(function () {

        // Классы редактора: нормальный вид и отдалённый от зрителя
        const normalClasses = getClasses()
        const scaleDownTransparencyClasses = getClasses('scaleDownTransparent')

        // В зависимости от вида показывать или нормальный вид редактора или отдалённый
        // или он вообще не будет отрисоваться.
        // Если нужно показать редактор
        if (entryAndEditorViewState === 'editor') {
            setClasses( normalClasses )
        }
        // Если нужно показать плавный переход от форм входа к редактору
        else if (entryAndEditorViewState === 'toEditor') {
            setClasses( scaleDownTransparencyClasses )
            setTimeout(function () {
                setClasses( normalClasses )
            }, 10)
        }
        // Если нужно показать плавный переход от редактора к формам входа
        else if (entryAndEditorViewState === 'toEntry') {
            setClasses( normalClasses )
            setTimeout(function () {
                setClasses( scaleDownTransparencyClasses )
            }, 10)
        }
        // Если нужно показать редактор
        else if (entryAndEditorViewState === 'entry') {
            setClasses( scaleDownTransparencyClasses )
        }
        // В противном случае ничего не отрисовать
        else {
            setClasses( scaleDownTransparencyClasses )
        }
    }, [entryAndEditorViewState])

    return makeCN(classes)
}

/**
 * Функция возвращает классы главной обёртки редактора в зависимости от различных значений:
 * @param {String} scaleDownType — тип дополнительного класса:
 * scaleDown — редактор отдалён от зрителя
 * scaleDownTransparent — редактор отдалён от зрителя и прозрачен
 */
function getClasses( scaleDownType?: 'scaleDown' | 'scaleDownTransparent' ) {
    const classes = [CN]

    if (scaleDownType === 'scaleDown') classes.push(`${CN}--scale-down`)
    if (scaleDownType === 'scaleDownTransparent') classes.push(`${CN}--scale-down-transparent`)

    return classes
}
