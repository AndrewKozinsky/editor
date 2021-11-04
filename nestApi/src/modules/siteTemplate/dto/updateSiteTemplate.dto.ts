import { IsNotEmpty } from 'class-validator'

export class UpdateSiteTemplateDto {
    @IsNotEmpty({message: 'siteTemplate_UpdateSiteTemplateDto_EmptyContent'})
    content: string
}
