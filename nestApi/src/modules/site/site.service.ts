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


@Injectable()
export class SiteService {

    constructor(
        @InjectRepository(SiteEntity)
        private readonly siteRepository: Repository<SiteEntity>,
        private readonly siteTemplateService: SiteTemplateService,
        private readonly compFolderService: CompFolderService,
        private readonly componentService: ComponentService
    ) {}

    /** Получение всех сайтов (защищённый маршрут) */
    async getAllSites(user: UserEntity): Promise<SiteEntity[]> {
        // Получение всех сайтов пользователя
        let sites = await this.siteRepository.find({userId: user.id})

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
                ...createSiteDto
            }
        )

        // Создание папки с компонентами
        await this.compFolderService.createCompFolder(
            { siteId: newSite.id, content: null },
            user
        )

        return await this.siteRepository.save(newSite)
    }

    async updateSite(id: number, updateSiteDto: UpdateSiteDto): Promise<SiteEntity> {
        // Найти сайт, который нужно обновить
        const site = await this.siteRepository.findOne({ id })

        // Throw an error if site is not exist
        if (!site) responseCommonError('site_UpdateSiteDto_EmptyUserId')

        // Если приходит пустая строка, то шаблон по умолчанию не выбран,
        // поэтому поставлю null потому что поле принимает или число или null
        if (updateSiteDto.defaultSiteTemplateId === '') {
            updateSiteDto.defaultSiteTemplateId = null
        }

        const updatedSite = Object.assign(site, updateSiteDto)
        return await this.siteRepository.save(updatedSite)
    }

    /** Удаление сайта (защищённый маршрут) */
    async deleteSite(siteId: number, currentUser: UserEntity): Promise<null> {
        const site = await this.siteRepository.findOne({id: siteId})

        // Throw an error if site is not exist
        if (!site) responseCommonError('site_DeleteSiteDto_SiteIsNotExists')

        // Бросить ошибку если текущий пользователь не создавал удаляемую статью
        if (site.userId !== currentUser.id) {
            responseCommonError('site_DeleteSiteDto_CurrentUserIsNotAuthor')
        }

        // Удалить сайт из БД
        await this.siteRepository.delete({id: siteId})

        // Удалить шаблоны сайта
        await this.siteTemplateService.deleteSiteTemplates(siteId)

        // Удалить папки шаблонов компонентов
        await this.compFolderService.deleteCompFolderBySiteId(siteId, currentUser)

        // Удалить шаблоны компонентов
        await this.componentService.deleteComponents(siteId)

        // Удалить папки статей


        // Удалить статьи


        // =================================
        // Удалить папки шаблонов компонентов
        // await ComponentsFoldersModel.deleteMany({siteId: req.params.siteId})

        // Удалить папки статей
        // await ArticlesFoldersModel.deleteMany({siteId: req.params.siteId})

        // Удалить статьи
        // await ArticleModel.deleteMany({siteId: req.params.siteId})

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
    }
}
