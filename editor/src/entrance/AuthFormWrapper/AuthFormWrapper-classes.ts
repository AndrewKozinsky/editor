import './AuthFormWrapper.scss'

const CN = 'auth-form-wrapper'

/** Функция возвращающая классы для элементов */
export default function makeClasses() {
    return {
        root: CN,
        logoWrapper: CN + `__logo-wrapper`
    }
}
