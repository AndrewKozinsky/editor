import './HeaderPage.scss'

const rootClass = 'header-page'

function makeClasses() {
    return {
        root: rootClass,
        contentDivided: `${rootClass}__content-divided`,
        contentDividedLeft: `${rootClass}__content-divided-left`,
        contentDividedCenter: `${rootClass}__content-divided-center`,
        contentDividedRight: `${rootClass}__content-divided-right`,
        contentSingle: `${rootClass}__content-single`,
        headerWrapper: `${rootClass}__header-wrapper`,
    }
}


export default makeClasses