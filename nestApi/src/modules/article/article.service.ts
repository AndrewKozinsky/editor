import { Response } from 'express'
import { Repository } from 'typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateArticleDto } from './dto/createArticle.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ArticleEntity } from './article.entity'
import { UserEntity } from '../user/user.entity'
import { ArticleResponseInterface } from './types/articleResponse.interface'
import responseCommonError from '../../utils/error/responseCommonError'
import { SiteEntity } from '../site/site.entity'
import {SiteTemplateEntity} from '../siteTemplate/siteTemplate.entity'
import { ExpressRequestInterface } from 'src/types/expressRequest.interface'
import { UpdateArticleDto } from './dto/updateArticle.dto'

@Injectable()
export class ArticleService {

    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
        @InjectRepository(SiteEntity)
        private readonly siteRepository: Repository<SiteEntity>,
        @InjectRepository(SiteTemplateEntity)
        private readonly siteTemplateRepository: Repository<SiteTemplateEntity>
    ) {}

    /** Получение компонента (защищённый маршрут) */
    async getArticle(req: ExpressRequestInterface): Promise<ArticleEntity | null> {
        return await this.articleRepository.findOne({where: {id: parseInt(req.params.articleId)}}) || null
    }

    /** Создание статьи (защищённый маршрут) */
    async createArticle(
        createArticleDto: CreateArticleDto, user: UserEntity
    ): Promise<ArticleEntity> {
        let newArticle = new ArticleEntity()

        newArticle = Object.assign(
            newArticle,
            {
                userId: user.id,
                ...createArticleDto
            }
        )

        // Проверка на существование указанного сайта
        const site = await this.siteRepository.findOne({where: { id: newArticle.siteId }})
        // Throw an error if site is not exist
        if (!site) {
            responseCommonError('component_CreateComponent_SiteIsNotExist', HttpStatus.BAD_REQUEST)
        }

        // Проверка на существование указанного шаблона сайта
        if (newArticle.siteTemplateId) {
            const siteTemplate = await this.siteTemplateRepository.findOne({where: { id: newArticle.siteTemplateId }})
            // Throw an error if site is not exist
            if (!siteTemplate) {
                responseCommonError('component_CreateComponent_SiteTemplateIsNotExist', HttpStatus.BAD_REQUEST)
            }
        }

        return await this.articleRepository.save(newArticle)
    }

    /** Обновление статьи (защищённый маршрут) */
    async updateArticle(
        articleId: number, updateArticleDto: UpdateArticleDto
    ): Promise<ArticleEntity> {

        // Найти статью, которую нужно обновить
        const article = await this.articleRepository.findOne({where: { id: articleId }})

        // Throw an error if an article is not exist
        if (!article) {
            responseCommonError('article_UpdateArticle_ArticleIsNotExist', HttpStatus.BAD_REQUEST)
        }

        // Если приходит пустая строка, то шаблон сайта не выбран,
        // поэтому поставлю null потому что поле принимает или число, или null
        if (updateArticleDto.siteTemplateId === '') {
            updateArticleDto.siteTemplateId = null
        }

        // Если приходит пустая строка, то id шаблона метаданных не выбран,
        // поэтому поставлю null потому что поле принимает или число, или null
        if (updateArticleDto.metaTemplateId === '') {
            updateArticleDto.metaTemplateId = null
        }

        const updatedArticle = Object.assign(article, updateArticleDto)
        return await this.articleRepository.save(updatedArticle)
    }

    /** Удаление компонента (защищённый маршрут) */
    async deleteArticle(articleId: number, currentUser: UserEntity): Promise<null> {
        const article = await this.articleRepository.findOne({where: {id: articleId}})

        // Throw an error if site template is not exist
        if (!article) {
            responseCommonError('article_DeleteArticle_ArticleIsNotExist', HttpStatus.BAD_REQUEST)
        }

        // Бросить ошибку если текущий пользователь не создавал удаляемую статью
        if (article.userId !== currentUser.id) {
            responseCommonError(
                'article_DeleteArticle_CurrentUserIsNotAuthor',
                HttpStatus.FORBIDDEN
            )
        }

        await this.articleRepository.delete({id: articleId})
        return null
    }

    /** Удаление статей сайта */
    async deleteArticles(siteId: number): Promise<null> {
        await this.articleRepository.delete({siteId})
        return null
    }


    /**
     * The function form response and send it to client
     * @param {Object} articles — articles data from database
     * @param {Object} response — response object
     * @param {Number} statusCode — status code
     */
    buildArticleResponse(
        articles: ArticleEntity[],
        response: Response,
        statusCode: number = HttpStatus.OK
    ): void {
        const resBody: ArticleResponseInterface = {
            status: 'success',
            statusCode,
            data: {
                articles: articles
            }
        }

        response.send(resBody)
    }
}
