
namespace MetaType {
    // Объект шаблона метаданных
    export type MetaTemplate = {
        name: string // Имя шаблона метаданных
        items: Items // Массив пунктов шаблонов метаданных
    }

    export type Items = Item[]
    export type Item = Header | Input

    // Заголовок
    export type Header = {
        id: number
        type: 'header' // Тип элемента: заголовок
        text: string // Текст заголовка
    }

    // Поле ввода
    export type Input = {
        id: number
        type: 'input' // Тип элемента: поле ввода
        label: string // Текст над полем ввода
        name: string // Значение атрибута name у поля ввода
        view?: InputViewType // Вид поля ввода
        values?: InputValues // Массив предопределённых значений поля
        value?: string[] // введённое значение поля ввода (для текстового поля) или id значения (для остальных полей)
    }

    export type InputViewType = 'text' | 'radio' | 'checkbox' | 'select'

    // Предопределённые значения поля ввода (для всех типов полей кроме текстового)
    export type InputValues = InputValue[]
    export type InputValue = {
        id: string
        label: string  // Текст показанных в поле ввода
        value: string  // Значение текста отправляемое в данные в качестве выбранного
    }
}

export default MetaType


// Example
export const articleMetaExample: MetaType.MetaTemplate = {
    name: 'Standard article',
    items: [
        {
            id: 1,
            type: 'header',
            text: 'General'
        },
        {
            id: 2,
            type: 'input',
            label: 'Article name',
            name: 'articleName'
        },
        {
            id: 4,
            type: 'input',
            label: 'Author',
            name: 'authorName',
            view: 'select',
            values: [
                {
                    id: '10',
                    label: 'Father McKenzie',
                    value: 'McKenzie'
                },
                {
                    id: '11',
                    label: 'Eleanor Rigby',
                    value: 'Rigby'
                }
            ]
        }
    ]
}