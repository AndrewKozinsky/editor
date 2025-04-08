import {IsNotEmpty, IsString} from 'class-validator'

export class UpdateSiteTemplateDto {
    @IsNotEmpty({message: 'siteTemplate_UpdateSiteTemplateDto_EmptyContent'})
    @IsString({
        message: 'siteTemplate_UpdateSiteTemplateDto_contentIsNotAString'
    })
    content: string
}
