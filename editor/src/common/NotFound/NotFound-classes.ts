import './NotFound.scss'

const NotFoundRootClass = 'not-found'

export default function makeClasses() {
    return {
        root: NotFoundRootClass,
        header: NotFoundRootClass + '__header'
    }
}
