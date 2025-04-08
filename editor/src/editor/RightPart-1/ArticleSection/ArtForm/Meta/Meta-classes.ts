import './Meta.scss'

const CN = 'meta'

/** Функция возвращающая классы для элементов */
export default function makeClasses() {
    return {
        root: CN,
        header: CN + '__header',
        inputWrapper: CN + '__input-wrapper',
    }
}
