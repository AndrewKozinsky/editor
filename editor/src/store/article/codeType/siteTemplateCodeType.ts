
namespace SiteTemplateTypes {
    export type Templates = Template[]

    export type Template = {
        name: string
        head?: string
        endBody?: string
    }
}

export default SiteTemplateTypes
