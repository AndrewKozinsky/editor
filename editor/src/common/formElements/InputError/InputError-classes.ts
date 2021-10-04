import './InputError.scss'

const appRootClass = 'input-error'

function makeClasses() {
    return {
        root: [appRootClass, appRootClass + '--error'].join(' '),
        icon: appRootClass + '__icon',
        paragraph: appRootClass + '__paragraph'
    }
}

export default makeClasses