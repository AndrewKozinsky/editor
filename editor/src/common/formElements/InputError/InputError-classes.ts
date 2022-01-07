import './InputError.scss'

const CN = 'input-error'

/** Функция возвращающая классы для элементов */
export default function makeClasses() {
    return {
        root: [CN, CN + '--error'].join(' '),
        icon: CN + '__icon',
        paragraph: CN + '__paragraph'
    }
}
