import './Notice.scss'

const noticeRootClass = 'notice'

function makeClasses(bg?: boolean) {
    return {
        bg: getBgClass(bg),
        icon: noticeRootClass + '__icon',
    }
}

function getBgClass(bg?: boolean) {
    const classes = [noticeRootClass]
    if (bg) classes.push(noticeRootClass + '--bg')

    return classes.join(' ')
}

export default makeClasses