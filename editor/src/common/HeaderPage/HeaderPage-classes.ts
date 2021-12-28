import './HeaderPage.scss'

const CN = 'header-page'

/** Функция возвращающая классы для элементов */
export default function makeClasses() {
    return {
        root: CN,
        contentDivided: `${CN}__content-divided`,
        contentDividedLeft: `${CN}__content-divided-left`,
        contentDividedCenter: `${CN}__content-divided-center`,
        contentDividedRight: `${CN}__content-divided-right`,
        contentSingle: `${CN}__content-single`,
        headerWrapper: `${CN}__header-wrapper`,
    }
}
