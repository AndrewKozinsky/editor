import TempCompTypes from './tempCompCodeType'

namespace ArticleTypes {
    // Article
    export type Article = {
        // Additional information
        dMeta: {
            version: 1
            // Max component id to understand what component id must be next
            dMaxCompId: Id
        }
        // Components array
        dComps: Components
    }

    // Массив, в котором находятся компоненты
    export type Components = MixComponent[]

    // Обычный или текстовый компонент
    export type MixComponent = Component | SimpleTextComponent

    // =================================================================================================================

    // Component
    export type Component = {
        // Component type
        dCompType: 'component'
        // Component data id
        dCompId: Id // 1
        // Component template id
        tCompId: Id
        // Component elements
        dElems?: ComponentElem
    }

    export type Id = number // 1

    // Layer options
    export type Layer = {
        layerCollapsed?: boolean // true
        layerHidden?: boolean // true
    }

    // Component elements
    export type ComponentElems = ComponentElem[]

    // Component element
    export type ComponentElem = {
        // Element data id
        dCompElemId: Id // 1
        // Element template id
        tCompElemId: TempCompTypes.ElemId // 'banner'
        // Или идентификатор тега (если выбрали из списка тегов) или название тега (если написали название в текстовое поле)
        dCompElemTag?: Tag
        dCompElemAttrs?: Attribs
        dCompElemLayer?: Layer
        dCompElemInnerElems?: ComponentElems
        dCompElemChildren?: ElemChildren
    }

    export type Tag = string // '1' OR 'div'

    export type Attribs = Attrib[]

    export type Attrib = {
        // id атрибута будет браться из шаблона
        tCompElemAttrId: TempCompTypes.ElemAttrValueId // '1'
        // Array of attributes ids (if there are exact number of values) or exact value (if it value was written in text field)
        dCompElemAttrValue: ComponentElemAttribValue // [4, 6] OR 'banner'
    }

    //
    export type ComponentElemAttribValue = TempCompTypes.ElemAttrValueId[] | TempCompTypes.ElemAttrValueId // ['4', '6'] OR 'banner'

    export type ElemChildren = MixComponent[]


    // =================================================================================================================


    // Simple Text component
    export type SimpleTextComponent = {
        dCompType: 'simpleTextComponent'
        dCompId: Id // 1
        text: string,
        dCompLayer?: {
            layerHidden?: boolean // true
        }
    }
}

export default ArticleTypes


export const emptyArticleData: ArticleTypes.Article = {
    dMeta: {
        version: 1,
        // Max component id to understand what component id must be next
        dMaxCompId: 0
    },
    // Components array
    dComps: [{
        // Component type
        dCompType: 'component',
        dCompId: 1,
        tCompId: 95,
    }]
}
