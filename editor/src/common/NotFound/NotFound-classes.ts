import './NotFound.scss'

const NotFoundRootClass = 'not-found'

function makeClasses() {
    return {
        root: NotFoundRootClass,
        header: NotFoundRootClass + '__header'
    }
}

export default makeClasses