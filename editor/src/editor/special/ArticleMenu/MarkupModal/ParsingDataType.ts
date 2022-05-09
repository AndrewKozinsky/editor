// ДАННЫЕ ДЛЯ ОТРИСОВКИ СТАТЬИ НА САЙТЕ ПОЛЬЗОВАТЕЛЯ
namespace ParsingData {
    export type Article = {
        general: {
            articleId: number
            articleName: string
        },
        meta?: null | ParsingDataMeta.Inputs
        components: ParsingDataComponents.MixComponents
    }
}

export default ParsingData


// МЕТАДАННЫЕ
export namespace ParsingDataMeta {
    export type Inputs = {
        [inputName: string]: Input // В ключе будет значение атрибута name у поля ввода, в значении данные поля
    }

    // Поле ввода
    export type Input = {
        label: string // Текст над полем ввода
        value: null | string // введённое значение поля ввода
    }
}


// ДАННЫЕ КОМПОНЕНТОВ
export namespace ParsingDataComponents {
    export type MixComponents = MixComponent[]
    type MixComponent = Component | SimpleTextComponent

    // Component
    export type Component = {
        compId: number
        compType: 'component'
        compTemplateId: string
        compElems?: ComponentElem
    }

    // Component elements
    export type ComponentElems = ComponentElem[]

    // Component element
    export type ComponentElem = {
        elemTemplateId: string // 'banner'
        // Или идентификатор тега (если выбрали из списка тегов) или название тега (если написали название в текстовое поле)
        elemTag?: string
        elemAttrs: Attribs
        elemInnerElems?: ComponentElems
        elemChildren: MixComponents
    }

    export type Attribs = Attrib[]
    export type Attrib = {
        // id атрибута будет браться из шаблона
        attrName: string
        attrValue: string
    }


    // =================================================================================================================


    // Simple Text component
    export type SimpleTextComponent = {
        compType: 'text'
        text: string,
    }
}