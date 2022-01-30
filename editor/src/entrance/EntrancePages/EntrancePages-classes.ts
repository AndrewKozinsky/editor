import useGetSettingsSelectors from 'store/settings/settingsSelectors'
import { useEffect, useState } from 'react'
import { makeCN } from 'utils/stringUtils'
import './EntrancePages.scss'

const appRootClass = 'entrance-pages'

/** Функция возвращающая классы для элементов */
export default function useMakeClasses() {
    const wrapperClass = useGetWrapperClasses()

    return {
        root: wrapperClass,
    }
}

/**
 * Функция возвращает классы обёртки регистрационных форм в зависимости от адреса
 * Если перешли на страницу редактора, то добавить обёртке дополнительный класс
 * плавно увеличивающий масштаб и увеличивающий прозрачность чтобы форма
 * анимированно исчезла когда пользователь перешёл на страницу редактора.
 */
export function useGetWrapperClasses() {
    const CN = appRootClass + '__wrapper'

    // Какой компонент должен быть нарисован
    const { entryAndEditorViewState } = useGetSettingsSelectors()

    const [classes, setClasses] = useState<string[]>([CN])

    useEffect(function () {
        if (entryAndEditorViewState === 'editor') {
            setClasses([CN, `${CN}--scale-up`])
        }
        else if (entryAndEditorViewState === 'toEditor') {
            setClasses([CN])
            setTimeout(function () {
                setClasses([CN, `${CN}--scale-up`])
            }, 10)
        }
        else if (entryAndEditorViewState === 'toEntry') {
            setClasses([CN, `${CN}--scale-up`])
            setTimeout(function () {
                setClasses([CN])
            }, 10)
        }
        else if (entryAndEditorViewState === 'entry') {
            setClasses([CN])
        }
        else {
            setClasses([CN])
        }
    }, [entryAndEditorViewState])

    return makeCN(classes)
}
