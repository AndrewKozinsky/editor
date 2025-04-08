// @ts-ignore
import { makeAutoObservable } from 'mobx'
import ArticleTypes from 'src/store/article/codeType/articleCodeType'

/* Хранилище сведений жизненного цикла редактирования текстового компонента */
export class TextManagerStore {
    // id выделенного текстового компонента (другие компоненты не учитываются)
    textCompId: ArticleTypes.Id | null = null
    // Создан ли новый объект истории для внесения текста текстового компонента
    newHistoryItemCreated = false

    // Изначальное значение текста компонента
    initialText = ''
    // Новое значение текста компонента
    newText = ''

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

    // Установщик изначального значения текста компонента
    setInitialText(text: string) {
        this.initialText = text
    }
    // Установщик изначального значения текста компонента
    setNewText(text: string) {
        this.newText = text
    }
}
const textManagerStore = new TextManagerStore()
export default textManagerStore