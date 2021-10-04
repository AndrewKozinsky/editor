import './AuthFormWrapper.scss'

const AFWRootClass = 'auth-form-wrapper'

function makeClasses() {
    return {
        root: AFWRootClass,
        logoWrapper: `${AFWRootClass}__logo-wrapper`
    }
}

export default makeClasses