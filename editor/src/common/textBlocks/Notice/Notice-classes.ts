import './Notice.scss'

const CN = 'notice'

/** Функция возвращающая классы для элементов */
export default function makeClasses(bg?: boolean) {
    return {
        bg: getBgClass(bg),
        icon: CN + '__icon',
        content: CN + '__content',
    }
}

function getBgClass(bg?: boolean) {
    const classes = [CN]
    if (bg) classes.push(CN + '--bg')

    return classes.join(' ')
}
