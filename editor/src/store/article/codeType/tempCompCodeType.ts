// Типы шаблона компонента
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

    // Код шаблона компонента
    export type Content = {
        // Идентификатор шаблона. Он задаётся программистом и нужен, чтобы сопоставить данные компонента с его шаблоном при создании разметки из данных.
        // В редакторе нигде не используется.
        templateId?: string
        // HTML шаблона. В атрибуте data-em-id указывается идентификатор элемента
        html: string // `<div class="banner" data-em-id="banner"><div><div data-em-id="cell"></div></div></div>`
        elems: Elems
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
        elemTags?: ElemTags
        //  Показывать ли данный элемент в статье по умолчанию
        elemHidden?: boolean // true
        // Можно ли дублировать данный элемент (true по умолчанию)
        elemCanDuplicate?: boolean // false
        // Нужно ли в элемент добавить пустой текстовый компонент для удобного набора
        addTextComponent?: boolean // true
    }

    export type ElemId = string // 'banner'

    export type ElemAttrs = ElemAttr[]

    export type ElemAttr = {
        // id атрибута. Это требуется чтобы различать одинаковые атрибуты. Например два класса.
        elemAttrId: string // '1'
        // Имя атрибута
        elemAttrName: string // 'class'
        // Alternative attribute name
        elemAttrAlt?: string // 'Класс'
        // В каком виде значения атрибута будут показываться на панеле выделенного элемента. Пока есть такие варианты: checkbox, radio, select, text
        elemAttrView?: InputViewType // 'text'
        // Значение атрибута, которое всегда будет присутствовать.
        elemAttrLockedValue?: string // 'banner '
        // Массив с предопределенными значениями атрибута. Они будут показаны если в качесте отображения используются поле любого типа кроме text.
        elemAttrValues?: ElemAttrValues
    }

    export type ElemAttrValues = ElemAttrValue[]

    export type ElemAttrValue = {
        // Идентификатор атрибута. Он нужен чтобы можно было удалять и менять значения атрибутов не завися от самого значения. Можно ввести только цифры.
        elemAttrValueId: ElemAttrValueId // '1'
        // Название класса
        elemAttrValueValue: string  // 'pattern-1'
        // Alternative class name
        elemAttrValueAlt?: string  // 'Восточный узор',
        // Отмечено ли данное значение атрибута при создании компонента
        elemAttrValueChecked?: boolean // true
    }

    export type ElemAttrValueId = string

    export type ElemTags = {
        elemTagsValues?: ElemTagsValues,
        elemTagsView?: InputTagViewType
    }

    export type ElemTagsValues = ElemTagsValue[]

    export type ElemTagsValue = {
        // Tag identifier. Он нужен чтобы можно было менять значения тега не завися от самого значения. Можно ввести только цифры.
        elemTagValueId: string // '1'
        // Tag name
        elemTagValueName: string // 'h1'
    }

    export type InputViewType = 'text' | 'radio' | 'checkbox' | 'select'
    export type InputTagViewType = 'text' | 'radio' | 'select'
}


export default TempCompTypes