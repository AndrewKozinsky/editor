
namespace ParsingData {
    export type Article = {
        meta: {
            articleName: string
        }
        components: MixComponents
    }

    export type MixComponents = MixComponent[]
    type MixComponent = Component | SimpleTextComponent


    // Component
    export type Component = {
        compType: 'component'
        compTemplateId: string
        compElements?: ComponentElem
    }

    // Component elements
    export type ComponentElems = ComponentElem[]

    // Component element
    export type ComponentElem = {
        elemTemplateId: string // 'banner'
        // Или идентификатор тега (если выбрали из списка тегов) или название тега (если написали название в текстовое поле)
        elemTag?: string
        elemAttributes?: Attribs
        elemInnerElems?: ComponentElems
        elemChildren?: ElemChildren
    }

    export type Attribs = Attrib[]
    export type Attrib = {
        // id атрибута будет браться из шаблона
        attrName: string
        attrValue: string
    }

    export type ElemChildren = MixComponent[]


    // =================================================================================================================


    // Simple Text component
    export type SimpleTextComponent = {
        compType: 'text'
        text: string,
    }
}

export default ParsingData