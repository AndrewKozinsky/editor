import './NotFound.scss'

const CN = 'not-found'

/** Функция возвращающая классы для элементов */
export default function makeClasses() {
    return {
        root: CN,
        header: CN + '__header'
    }
}
