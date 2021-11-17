import {
    Req, Res, Get, Post, Patch, Param, Body,
    Controller, HttpStatus, UseGuards, UsePipes, Delete
} from '@nestjs/common'
import { ArticleService } from './article.service'
import { Response } from 'express'
import { ExpressRequestInterface } from '../../types/expressRequest.interface'
import { BackendValidationPipe } from 'src/utils/error/backendValidation.pipe'
import { CreateArticleDto } from './dto/createArticle.dto'
import { UserEntity } from '../user/user.entity'
import { User } from '../user/decorators/user.decorator'
import { AuthGuard } from '../user/guards/auth.guard'
import { UpdateArticleDto } from './dto/updateArticle.dto'


@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    // Получение статьи
    @UseGuards(AuthGuard)
    @Get(':articleId')
    async findOne(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        const article = await this.articleService.getArticle(req)
        this.articleService.buildArticleResponse([article], response)
    }

    // Создание статьи
    @UseGuards(AuthGuard)
    @Post('')
    @UsePipes(new BackendValidationPipe())
    async createArticle(
        @Body() createArticleDto: CreateArticleDto,
        @Res({ passthrough: true }) response: Response,
        @User() currentUser: UserEntity,
    ): Promise<void> {
        const article = await this.articleService.createArticle(createArticleDto, currentUser)
        this.articleService.buildArticleResponse([article], response, HttpStatus.CREATED)
    }

    // Изменение статьи
    @Patch(':articleId')
    @UsePipes(new BackendValidationPipe())
    @UseGuards(AuthGuard)
    async changeArticle(
        @Param('articleId') articleId: number,
        @Res({ passthrough: true }) response: Response,
        @Body() updateArticleDto: UpdateArticleDto
    ): Promise<void> {
        const updatedArticle = await this.articleService.updateArticle(articleId, updateArticleDto)
        this.articleService.buildArticleResponse([updatedArticle], response)
    }

    // Удаление статьи
    @Delete(':articleId')
    @UseGuards(AuthGuard)
    async deleteSiteTemplate(
        @Param('articleId') articleId: number,
        @Res({ passthrough: true }) response: Response,
        @User() currentUser: UserEntity
    ): Promise<void> {
        await this.articleService.deleteArticle(articleId, currentUser)
        this.articleService.buildArticleResponse([], response)
    }
}
