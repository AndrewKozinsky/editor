import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateMetaTemplateDto {
    @IsNotEmpty({message: 'metaTemplate_UpdateMetaTemplateDto_EmptyContent'})
    @IsString({
        message: 'metaTemplate_UpdateMetaTemplateDto_contentIsNotAString'
    })
    content: string
}
