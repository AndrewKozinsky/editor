import './NotFound.scss'

const NotFoundRootClass = 'not-found'

/** Функция возвращающая классы для элементов */
export default function makeClasses() {
    return {
        root: NotFoundRootClass,
        header: NotFoundRootClass + '__header'
    }
}
