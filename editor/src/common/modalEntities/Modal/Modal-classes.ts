import './Modal.scss'

const rootClass = 'modal'

function makeClasses() {
    return {
        root: rootClass,
        outerWrapper: `${rootClass}__outer-wrapper`,
        closeBtn: `${rootClass}__close-btn`
    }
}

export default makeClasses