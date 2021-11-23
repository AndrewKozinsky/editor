namespace TempCompTypes {
    export type TempComps = TempComp[]

    // Компонент
    export type TempComp = {
        // Уникальный, в пределах сайта, id шаблона компонента. Он нужен для связи шаблона и данных генерируемых редактором. Этот же id используется в Сборщике.
        id: Id // 4
        content: Content
    }

    // Component template id
    export type Id = number

    // Код компонента
    export type Content = {
        // Название компонента
        name: string, // 'Banner'
        // HTML шаблона. В атрибуте data-em-id указывается идентификатор элемента
        html: string // `<div class="banner" data-em-id="banner"><div><div data-em-id="cell"></div></div></div>`
        elems?: Elems
    }

    // Массив элементов компонента
    export type Elems = Elem[]

    // Элемент компонента
    export type Elem = {
        // Уникальный, в пределах компонента, идентификатор элемента. Он связывает значение указанное в атрибуте data-em-id.
        elemId: ElemId // 'banner'
        elemName: string // 'Ячейка'
        // Массив атрибутов
        elemAttrs?: ElemAttrs
        elemTags?: {
            elemTagsValues?: ElemTags,
            elemTagsView?: InputType
        }
        //  Показывать ли данный элемент в статье по умолчанию
        elemHidden?: boolean // true
        // Можно ли дублировать данный элемент (true по умолчанию)
        elemCanDuplicate?: boolean // false
        // Нужно ли в элемент добавить пустой текстовый компонент для удобного набора
        elemTextInside?: boolean // true
        elemText?: ElemText
    }

    export type ElemId = string // 'banner'

    export type ElemAttrs = ElemAttr[]

    export type ElemAttr = {
        // id атрибута. Это требуется чтобы различать одинаковые атрибуты. Например два класса.
        elemAttrId: number // 1
        // Имя атрибута
        elemAttrName: string // 'class'
        // Alternative attribute name
        elemAttrAlt?: string // 'Класс'
        // В каком виде значения атрибута будут показываться на панеле выделенного элемента. Пока есть такие варианты: checkbox, radio, select, text
        elemAttrView?: InputType // 'text'
        // Значение атрибута, которое всегда будет присутствовать.
        elemAttrLockedValue?: string // 'banner '
        // Массив с предопределенными значениями атрибута. Они будут показаны если в качесте отображения используются поле любого типа кроме text.
        elemAttrValues?: ElemAttrValues
    }

    export type ElemAttrValues = ElemAttrValue[]

    export type ElemAttrValue = {
        // Идентификатор атрибута. Он нужен чтобы можно было удалять и менять значения атрибутов не завися от самого значения. Можно ввести только цифры.
        elemAttrValueId: number // 1
        // Название класса
        elemAttrValueValue: string  // 'pattern-1'
        // Alternative class name
        elemAttrValueAlt?: string  // 'Восточный узор',
        // Отмечено ли данное значение атрибута при создании компонента
        elemAttrValueChecked?: boolean // true
    }

    export type ElemTags = ElemTag[]

    export type ElemTag = {
        // Tag identifier. Он нужен чтобы можно было менять значения тега не завися от самого значения. Можно ввести только цифры.
        elemTagValueId: number // 1
        // Tag name
        elemTagValueName: string // 'h1'
    }

    export type ElemText = {
        // Allowed tags for use
        elemTextTags?: ElemTextTags
        elemTextAttrs?: ElemTextAttrs
    }

    export type ElemTextTags = ElemTextTag[]

    export type ElemTextTag = {
        elemTextTagId: number // 1
        elemTextTagName: string // 'p'
    }

    export type ElemTextAttrs = ElemTextAttr[]

    export type ElemTextAttr = {
        elemTextAttrId: number // 1
        // Attribute name
        elemTextAttrName: string // 'class'
        // Alternative attribute name
        elemTextAttrAlt?: string // 'Класс'
        // In what view attribute value will be shown in the text panel
        elemTextAttrView?: InputType
        // An attribute value that will always be present
        elemTextAttrLockedValue?: string // 'banner '
        elemTextAttrValues?: ElemTextAttrValues
    }

    export type ElemTextAttrValues = ElemTextAttrValue[]

    export type ElemTextAttrValue = {
        // Attribute identifier. Он нужен чтобы можно было удалять и менять значения атрибутов не завися от самого значения.
        elemTextAttrValueId: number // 1
        // Attribute name
        elemTextAttrValueValue: string // 'pattern-1'
        // Alternative attribute name
        elemTextAttrValueAlt?: string // 'Узор 1'
        // Отмечен ли данный класс при создании компонента
        elemTextAttrValueChecked?: boolean // true
    }

    export type InputType = 'text' | 'radio' | 'checkbox' | 'select'
}


export default TempCompTypes