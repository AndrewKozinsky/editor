import './BottomButtons.scss'

const CN = 'left-bottom-section'

/** Функция возвращающая классы для элементов */
export default function makeClasses() {
    return {
        root: CN,
        group: CN + '__group',
        button: CN + '__button',
    }
}
