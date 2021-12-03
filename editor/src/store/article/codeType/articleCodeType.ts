namespace ArticleTypes {
    // Article
    export type Article = {
        // Additional information
        dMeta: {
            // Max component id to understand what component id must be next
            dMaxCompId: number
        }
        // Components array
        dComps: Components
    }

    export type Components = ArticleArrayItem[]
    export type ArticleArrayItem = Component | TextComponent

    // =================================================================================================================

    // Component
    export type Component = {
        // Component type
        dCompType: 'component'
        // Component data id
        dCompId: DataCompId // 1
        // Component template id
        tCompId: TempCompId
        dCompLayer?: Layer
        // Component elements
        dElems?: ComponentElems
    }

    export type DataCompId = number // 1
    export type TempCompId = number // 2

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
        dCompElemId: DataElemId // 1
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

    export type DataElemId = number // 1
    export type TempElemId = string // 'banner'
    export type ElemGroup = string // ''banner-1'
    export type Tag = number | string // 1 OR 'div'

    export type Attribs = Attrib[]

    export type Attrib = {
        dCompElemAttrId: ComponentElemAttribId // 1
        // Array of attributes ids (if there are exact number of values) or exact value (if it value was written in text field)
        dCompElemAttrValue: ComponentElemAttribValue // [4, 6] OR 'banner'
    }

    export type ComponentElemAttribId = number // 1
    export type ComponentElemAttribValue = number[] | string // [4, 6] OR 'banner'

    export type ElemChildren = (Component | TextComponent)[]

    // =================================================================================================================


    // Text component
    export type TextComponent = {
        dCompType: 'textComponent'
        // Component data id
        dCompId: DataCompId // 2
        // Component template id
        tCompId: TempCompId // 39
        // id элемента шаблона чтобы понимать откуда брать данные по тегам и атрибутам
        tCompElemId: TempElemId // 'banner'
        // Layer settings
        layer?: Layer
        dCompElemChildren?: TextChildren
    }

    export type TextChildren = TextChild[]
    export type TextChild = Component | TagObject | TextObject

    export type TagObject =  {
        dCompType: 'textTag'
        // id тега, в который завернут контент
        dTextTag: Tag
        dTagObjectAttrs?: Attribs
        dCompElemChildren?: TextChildren
    }

    export type TextObject =  {
        dCompType: 'text'
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
