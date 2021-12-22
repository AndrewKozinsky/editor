import './Notice.scss'

const noticeRootClass = 'notice'

export default function makeClasses(bg?: boolean) {
    return {
        bg: getBgClass(bg),
        icon: noticeRootClass + '__icon',
        content: noticeRootClass + '__content',
    }
}

function getBgClass(bg?: boolean) {
    const classes = [noticeRootClass]
    if (bg) classes.push(noticeRootClass + '--bg')

    return classes.join(' ')
}
