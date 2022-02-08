// @ts-ignore
import { makeAutoObservable } from 'mobx'
import ArticleTypes from 'store/article/codeType/articleCodeType'

/* Хранилище сведений жизненного цикла редактирования текстового компонента */
class TextManagerData {
    // id выделенного текстового компонента (другие компоненты не учитываются)
    textCompId: ArticleTypes.Id | null = null
    // Создан ли новый объект истории для внесения текста текстового компонента
    newHistoryItemCreated: boolean = false
    // id таймера после которого данные ставятся в текстовый компонент
    // Таймер нужен чтобы лишний раз не нагружать Хранилище
    timerId: NodeJS.Timeout

    constructor() {
        makeAutoObservable(this)
    }

    // Установщик значения textCompId
    setTextCompId(textCompId: ArticleTypes.Id | null) {
        this.textCompId = textCompId
    }

    // Установщик значения newHistoryItemCreated
    setNewHistoryItemCreated(wasCreated: boolean) {
        this.newHistoryItemCreated = wasCreated
    }

    // Установщик значения timerId
    setTimerId(id: NodeJS.Timeout) {
        this.timerId = id
    }
}
const textManagerData = new TextManagerData()
export default textManagerData