// @ts-ignore
import { makeAutoObservable } from 'mobx'
import ArticleTypes from 'store/article/codeType/articleCodeType'

/* Хранилище сведений жизненного цикла редактирования текстового компонента */
export class TextManagerData {
    // id выделенного текстового компонента (другие компоненты не учитываются)
    textCompId: ArticleTypes.Id | null = null
    // Создан ли новый объект истории для внесения текста текстового компонента
    newHistoryItemCreated: boolean = false

    // Изначальное значение текста компонента
    initialText: string = ''
    // Новое значение текста компонента
    newText: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    // Установщик значения textCompId
    setTextCompId(textCompId: ArticleTypes.Id | null) {
        this.textCompId = textCompId

        if (!textCompId) {
            // this.initialText = ''
            // this.newText = ''
        }
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
const textManagerData = new TextManagerData()
export default textManagerData