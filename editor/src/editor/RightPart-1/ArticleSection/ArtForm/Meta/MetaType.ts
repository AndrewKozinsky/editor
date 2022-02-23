
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


// Пример формы изменения метаданных статьи
export const articleMetaExample: MetaType.Items = [
    {
        id: 1,
        type: 'header',
        text: 'Общие сведения'
    },
    {
        id: 2,
        type: 'input',
        label: 'Название статьи',
        name: 'articleName'
    },
    {
        id: 3,
        type: 'input',
        label: 'Подзаголовок статьи',
        name: 'articleDescription'
    },
    {
        id: 4,
        type: 'input',
        label: 'Автор',
        name: 'authorName',
        view: 'select',
        values: [
            {
                id: '10',
                label: 'Виктория Кулькова',
                value: 'VK'
            },
            {
                id: '11',
                label: 'Юлия Кулькова',
                value: 'YK'
            },
            {
                id: '12',
                label: 'Андрей Яковлев',
                value: 'AYA'
            },
        ]
    },
    {
        id: 5,
        type: 'input',
        label: 'Теги',
        name: 'tags',
        view: 'radio',
        values: [
            {
                id: '10',
                label: 'Увлечения',
                value: 'enthusiasm'
            },
            {
                id: '11',
                label: 'Путешествия',
                value: 'travel'
            },
            {
                id: '12',
                label: 'Работа',
                value: 'job'
            },
        ]
    },

    {
        id: 6,
        type: 'header',
        text: 'Шапка'
    },
    {
        id: 7,
        type: 'input',
        label: 'Путь до изображения',
        name: 'headerImgSrc',
        view: 'text'
    },
    {
        id: 8,
        type: 'input',
        label: 'Расположение изображения',
        name: 'headerImgPosition',
        view: 'checkbox',
        values: [
            {
                id: '10',
                label: 'Фон',
                value: 'background'
            },
            {
                id: '11',
                label: 'Внутри',
                value: 'inside'
            },
        ]
    }
]