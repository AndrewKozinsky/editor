import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import {makeCN} from 'utils/StringUtils'


/** Хук возращает статус нужно ли отрисовывать окно */
export function useGetIsModalOpen() {
    // Открыто ли модальное окно и его содержимое
    const { isOpen } = useSelector((store: AppState) => store.modal)

    // Должно ли модальное окно быть отрисовано
    const [isModalOpen, setIsModalOpen] = useState(isOpen)

    // При изменении статуса открытости модального окна
    useEffect(function () {
        // Если окно открыли, то сразу отрисовать окно
        // Если закрыли, то должна произойти анимация закрытия,
        // уже после можно удалять из разметки
        if (isOpen) {
            setIsModalOpen(true)
        }
        else {
            setTimeout(function () {
                setIsModalOpen(false)
            }, 300)
        }
    }, [isOpen])

    return isModalOpen
}

/**
 * Функция возвращает классы обёртки модального окна в зависимости от того отрыли ли его или закрыли.
 * @param {String} CN — Название главного класса.
 * @param {String} size — размер элемента.
 */
export function useGetModalClasses(CN: string, size: StoreSettingsTypes.EditorSize) {

    // Открыто ли модальное окно и его содержимое
    const { isOpen } = useSelector((store: AppState) => store.modal)

    // Классы обёртки
    const [classes, setClasses] = useState([CN])

    // При открытии/закрытии окна нужно задавать открывающие или закрывающие классы
    // для плавного открытия или закрытия.
    useEffect(function () {

        // Классы открытого окна
        const normalClasses = [CN, `${CN}--${size}-size`]
        // Классы увеличенного прозрачного окна
        const scaleUpClasses = [CN, `${CN}--scale-up`, `${CN}--${size}-size`]

        if (isOpen) {
            // Первоначально модальное окно должно быть увеличенным
            setClasses( scaleUpClasses )
            // Затем убрать увеличивающий класс
            setTimeout(function () {
                setClasses( normalClasses )
            }, 10)
        }
        else {
            // При закрытии поставить увеличивающий класс
            // чтобы окно уменьшаясь плавно исчезало
            setClasses( scaleUpClasses )
        }
    }, [isOpen])

    return makeCN(classes)
}

/**
 * Функция возвращает текст на кнопке закрытия в соответствии с переданным языком
 * @param lang
 */
export function getCloseBtnText(lang: StoreSettingsTypes.EditorLanguage) {
    const text = {
        eng: 'Close',
        rus: 'Закрыть'
    }

    return text[lang]
}

