import {IsNotEmpty, IsString} from 'class-validator'

export class UpdateArticleDto {
    @IsNotEmpty({
        message: 'article_UpdateArticleDto_EmptyContent'
    })
    @IsString({
        message: 'article_UpdateArticleDto_contentIsNotAString'
    })
    content: string
}
