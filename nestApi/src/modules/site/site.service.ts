import { Response } from 'express'
import { Repository } from 'typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateSiteDto } from './dto/createSite.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { SiteEntity } from './site.entity'
import { UserEntity } from '../user/user.entity'
import { SitesResponseInterface } from './types/sitesResponse.interface'
import { UpdateSiteDto } from './dto/updateSite.dto'
import responseCommonError from 'src/utils/error/responseCommonError'
import { SiteTemplateService } from '../siteTemplate/siteTemplate.service'
import {sortByCreatedAt} from '../../utils/miscUtils'
import { ComponentService } from '../component/component.service'
import { CompFolderService } from '../compFolder/compFolder.service'
import { ArtFolderService } from '../artFolder/artFolder.service'
import { ArticleService } from '../article/article.service'


@Injectable()
export class SiteService {

    constructor(
        @InjectRepository(SiteEntity)
        private readonly siteRepository: Repository<SiteEntity>,
        private readonly siteTemplateService: SiteTemplateService,
        private readonly compFolderService: CompFolderService,
        private readonly componentService: ComponentService,
        private readonly artFolderService: ArtFolderService,
        private readonly articleService: ArticleService,
    ) {}

    /** Получение всех сайтов (защищённый маршрут) */
    async getAllSites(user: UserEntity): Promise<SiteEntity[]> {
        // Получение всех сайтов пользователя
        let sites = await this.siteRepository.find({where: {userId: user.id}})

        // Отсортировать сайты по времени создания и вернуть
        return sortByCreatedAt(sites)
    }

    /** Создание сайта (защищённый маршрут) */
    async createSite(createSiteDto: CreateSiteDto, user: UserEntity): Promise<SiteEntity> {
        const newSite = new SiteEntity()

        Object.assign(
            newSite,
            {
                userId: user.id,
                defaultSiteTemplateId: null,
                ...createSiteDto
            }
        )

        // Сохранение новой статьи и получение полных данных
        const newSiteFullData =  await this.siteRepository.save(newSite)

        // Создание папки с компонентами
        await this.compFolderService.createCompFolder(
            { siteId: newSiteFullData.id, content: null },
            user
        )

        // Создание папки со статьями
        await this.artFolderService.createArtFolder(
            { siteId: newSiteFullData.id, content: null },
            user
        )

        return newSiteFullData
    }

    /** Обновление сайта (защищённый маршрут) */
    async updateSite(id: number, updateSiteDto: UpdateSiteDto): Promise<SiteEntity> {
        // Найти сайт, который нужно обновить
        const site = await this.siteRepository.findOne({where: { id }})

        // Throw an error if site is not exist
        if (!site) {
            responseCommonError(
                'site_UpdateSiteDto_EmptyUserId',
                HttpStatus.BAD_REQUEST
            )
        }

        // Если приходит пустая строка, то id шаблона сайта по умолчанию не выбран,
        // поэтому поставлю null потому что поле принимает или число, или null
        if (updateSiteDto.defaultSiteTemplateId === '') {
            updateSiteDto.defaultSiteTemplateId = null
        }

        // Если приходит пустая строка, то id шаблон метаданных по умолчанию не выбран,
        // поэтому поставлю null потому что поле принимает или число, или null
        if (updateSiteDto.defaultMetaTemplateId === '') {
            updateSiteDto.defaultMetaTemplateId = null
        }

        const updatedSite = Object.assign(site, updateSiteDto)
        return await this.siteRepository.save(updatedSite)
    }

    /** Удаление сайта (защищённый маршрут) */
    async deleteSite(siteId: number, currentUser: UserEntity): Promise<null> {
        const site = await this.siteRepository.findOne({where: {id: siteId}})

        // Throw an error if site is not exist
        if (!site) {
            responseCommonError(
                'site_DeleteSiteDto_SiteIsNotExists',
                HttpStatus.BAD_REQUEST
            )
        }

        // Бросить ошибку если текущий пользователь не создавал удаляемую статью
        if (site.userId !== currentUser.id) {
            responseCommonError(
                'site_DeleteSiteDto_CurrentUserIsNotAuthor',
                HttpStatus.FORBIDDEN
            )
        }

        // Удалить сайт из БД
        await this.siteRepository.delete({id: siteId})

        // Удалить шаблоны сайта
        await this.siteTemplateService.deleteSiteTemplates(siteId)

        // Удалить папку шаблонов компонентов
        await this.compFolderService.deleteCompFolderBySiteId(siteId, currentUser)

        // Удалить шаблоны компонентов
        await this.componentService.deleteComponents(siteId)

        // Удалить папки статей
        await this.artFolderService.deleteArtFolderBySiteId(siteId, currentUser)

        // Удалить статьи
        await this.articleService.deleteArticles(siteId)

        return null
    }

    /** Удаление сайтов пользователя (защищённый маршрут) */
    async deleteUserSites(user: UserEntity): Promise<null> {
        const userSites = await this.getAllSites(user)
        for (let userSite of userSites) {
            await this.deleteSite(userSite.id, user)
        }

        return null
    }


    /**
     * The function form response and send it to client
     * @param {Object} sites — sites data from database
     * @param {Object} response — response object
     * @param {Number} statusCode — status code
     */
    buildSiteResponse(
        sites: SiteEntity[],
        response: Response,
        statusCode: number = HttpStatus.OK
    ): void {
        const resBody: SitesResponseInterface = {
            status: 'success',
            statusCode,
            data: {
                sites: sites
            }
        }

        response.send(resBody)
        return
    }
}
