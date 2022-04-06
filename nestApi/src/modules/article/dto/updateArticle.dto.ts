import {IsNumber, IsOptional, IsString} from 'class-validator'

export class UpdateArticleDto {
    @IsOptional()
    @IsString({
        message: 'article_UpdateArticleDto_nameIsNotAString'
    })
    name: string

    @IsOptional()
    @IsString({
        message: 'article_UpdateArticleDto_contentIsNotAString'
    })
    content: string

    @IsOptional()
    siteTemplateId: number | ''

    @IsOptional()
    metaTemplateId: number | ''
}
