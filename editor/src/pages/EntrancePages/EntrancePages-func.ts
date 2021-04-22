// @ts-ignore
import { useLocation, useHistory } from 'react-router-dom'
import {makeCN} from 'utils/StringUtils'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import {useGetUserToken} from 'requests/authRequests'
import userActions from 'store/user/userActions'
import actions from '../../store/rootAction';

/**
 * Функция возращает классы обёртки регистрационных форм в зависимости от адреса
 * Если перешли на страницу редактора, то добавить обёртке дополнительный класс
 * плавно увеличивающий масштаб и увеличивающий прозрачность чтобы форма
 * анимированно исчезла когда пользователь перешёл на страницу редактора.
 */
export function useGetWrapperClasses(CN: string) {

    // Какой компонент должен быть отрисован
    const { entryAndEditorViewState } = useSelector((store: AppState) => store.settings)

    const [classes, setClasses] = useState<string[]>([CN])
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {

        if (entryAndEditorViewState === 'editor') {
            setIsVisible(false)
            setClasses([CN, `${CN}--scale-up`])
        }
        else if (entryAndEditorViewState === 'toEditor') {
            setIsVisible(true)
            setClasses([CN])
            setTimeout(function () {
                setClasses([CN, `${CN}--scale-up`])
            }, 10)
        }
        else if (entryAndEditorViewState === 'toEntry') {
            setIsVisible(true)
            setClasses([CN, `${CN}--scale-up`])
            setTimeout(function () {
                setClasses([CN])
            }, 10)
        }
        else if (entryAndEditorViewState === 'entry') {
            setIsVisible(true)
            setClasses([CN])
        }
        else {
            setIsVisible(false)
            setClasses([CN])
        }
    }, [entryAndEditorViewState])

    return {
        classes: makeCN(classes),
        isVisible
    }
}


export function useViewStateChanger() {
    const dispatch = useDispatch()

    // Предыдущий адрес
    const { lastAddress } = useSelector((store: AppState) => store.settings)

    let history = useHistory()
    const address = history.location.pathname // Текущий адрес виде /enter

    useEffect(function () {

        // Если сразу открыли редактор...
        if ( !lastAddress && address === '/' ) {
            // Поставить, что должен быть открыт редактор
            dispatch( actions.settings.setEntryAndEditorViewState('editor') )
        }
        // Если сразу открыли страницу входа
        else if (!lastAddress && address !== '/') {
            // Поставить, что должены быть открыты формы входа
            dispatch( actions.settings.setEntryAndEditorViewState('entry') )
        }
        // Если с формы входа перешли в редактор
        else if (lastAddress !== '/' && address === '/') {
            // Поставить, что сначала должен быть плавный переход к редактору...
            dispatch( actions.settings.setEntryAndEditorViewState('toEditor') )
            setTimeout(function () {
                // ...а затем полное закрытие формы входа через некоторое время
                dispatch( actions.settings.setEntryAndEditorViewState('editor') )
            }, 500)
        }
        // Если с редактора перешли на форму входа
        else if (lastAddress === '/' && address !== '/') {
            // Поставить, что сначала должен быть плавный переход к форме входа...
            dispatch( actions.settings.setEntryAndEditorViewState('toEntry') )
            setTimeout(function () {
                // ...а затем полное закрытие редактора через некоторое время
                dispatch( actions.settings.setEntryAndEditorViewState('entry') )
            }, 500)
        }


        // Поставить текущий адрес в Хранилище в качестве последнего
        dispatch( actions.settings.setLastAddress(address) )
    }, [address])
}