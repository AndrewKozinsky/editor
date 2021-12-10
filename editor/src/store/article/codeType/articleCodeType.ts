namespace ArticleTypes {
    // Article
    export type Article = {
        // Additional information
        dMeta: {
            // Max component id to understand what component id must be next
            dMaxCompId: Id
        }
        // Components array
        dComps: Components
    }

    export type Components = ArticleArrayItem[]
    export type ArticleArrayItem = Component | SimpleTextComponent

    // =================================================================================================================

    // Component
    export type Component = {
        // Component type
        dCompType: 'component'
        // Component data id
        dCompId: Id // 1
        // Component template id
        tCompId: Id
        dCompLayer?: Layer
        // Component elements
        dElems?: ComponentElems
    }

    export type Id = number // 1

    // Layers options
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
        tCompElemId: TempElemId // 1
        // Name of elements group with the same tempElemId. They may be several groups with the same tempElemId.
        dCompElemGroup: ElemGroup // 'banner-1'
        // Или идентификатор тега (если выбрали из списка тегов) или название тега (если написали название в текстовое поле)
        dCompElemTag?: Tag
        dCompElemAttrs?: Attribs
        dCompElemLayer?: Layer
        dCompElemChildren?: ElemChildren
    }

    export type TempElemId = string // 'banner'
    export type ElemGroup = string // ''banner-1'
    export type Tag = number | string // 1 OR 'div'

    export type Attribs = Attrib[]

    export type Attrib = {
        dCompElemAttrId: Id // 1
        // Array of attributes ids (if there are exact number of values) or exact value (if it value was written in text field)
        dCompElemAttrValue: ComponentElemAttribValue // [4, 6] OR 'banner'
    }

    export type ComponentElemAttribValue = number[] | string // [4, 6] OR 'banner'

    export type ElemChildren = Component[] | SimpleTextComponent


    // =================================================================================================================


    // Simple Text component
    export type SimpleTextComponent = {
        dCompType: 'simpleTextComponent'
        dCompId: Id // 1
        text: string
    }
}

export default ArticleTypes


export const emptyArticleData: ArticleTypes.Article = {
    dMeta: {
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
