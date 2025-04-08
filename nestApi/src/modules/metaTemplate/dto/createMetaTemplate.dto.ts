import {IsNotEmpty, IsString } from 'class-validator'
import { Column } from 'typeorm'

export class CreateMetaTemplateDto {
    @IsNotEmpty({message: 'metaTemplate_CreateMetaTemplateDto_EmptySiteId'})
    @Column({type: 'integer'})
    siteId: number

    @IsNotEmpty({
        message: 'metaTemplate_CreateMetaTemplateDto_EmptyContent'
    })
    @IsString({
        message: 'metaTemplate_CreateMetaTemplateDto_contentIsNotAString'
    })
    content: string
}
