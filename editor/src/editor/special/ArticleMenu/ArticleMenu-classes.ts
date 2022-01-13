import './ArticleMenu.scss'

const CN = 'article-menu'

/** Функция возвращающая классы для элементов */
export default function makeClasses() {
    return {
        outerWrapper: CN + '__outer-wrapper',
        mainButton: CN + '__main-button',

        menuRoot: CN + '__root',
        menuSection: CN + '__section',
    }
}
