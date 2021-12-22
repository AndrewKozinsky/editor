import './InputError.scss'

const appRootClass = 'input-error'

export default function makeClasses() {
    return {
        root: [appRootClass, appRootClass + '--error'].join(' '),
        icon: appRootClass + '__icon',
        paragraph: appRootClass + '__paragraph'
    }
}
