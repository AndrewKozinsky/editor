import './AuthFormWrapper.scss'

const AFWRootClass = 'auth-form-wrapper'

export default function makeClasses() {
    return {
        root: AFWRootClass,
        logoWrapper: `${AFWRootClass}__logo-wrapper`
    }
}
