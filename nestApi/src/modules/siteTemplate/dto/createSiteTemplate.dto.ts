import {IsNotEmpty, IsString, MaxLength} from 'class-validator'
import { Column } from 'typeorm'

export class CreateSiteTemplateDto {
    @IsNotEmpty({message: 'siteTemplate_CreateSiteTemplateDto_EmptySiteId'})
    @Column({type: 'integer'})
    siteId: number

    @IsNotEmpty({
        message: 'siteTemplate_CreateSiteTemplateDto_EmptyContent'
    })
    @IsString({
        message: 'siteTemplate_CreateSiteTemplateDto_contentIsNotAString'
    })
    content: string
}
