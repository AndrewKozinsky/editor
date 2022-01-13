import {IsInt, IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator'
import {Column} from 'typeorm'

export class CreateArticleDto {
    @IsNotEmpty({message: 'article_CreateArticleDto_EmptySiteId'})
    @Column({type: 'integer'})
    siteId: number

    @IsNotEmpty({
        message: 'article_CreateArticleDto_nameIsEmpty'
    })
    @MaxLength( 255, {
        message: 'article_CreateArticleDto_nameTooLong'
    })
    name: string

    @IsString({
        message: 'article_CreateArticleDto_contentIsNotAString'
    })
    content: string

    @IsOptional()
    @IsInt({
        message: 'article_CreateArticleDto_siteTemplateIdIsNotANumber'
    })
    siteTemplateId: number
}
