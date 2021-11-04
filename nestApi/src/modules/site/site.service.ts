import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateSiteDto } from './dto/createSite.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { SiteEntity } from './site.entity'
import {UserEntity} from '../user/user.entity'
import {Repository, getRepository} from 'typeorm'
import { Response } from 'express'
import { SitesResponseInterface } from './types/sitesResponse.interface'
import {UpdateSiteDto} from './dto/updateSite.dto'
import responseCommonError from 'src/utils/error/responseCommonError'
import {SiteTemplateService} from '../siteTemplate/siteTemplate.service'
// import { ExpressRequestInterface } from 'src/types/expressRequest.interface'
// import { SendConfirmLetterDto } from './dto/sendConfirmLetter.dto'
// import { ResetPasswordDto } from './dto/resetPassword.dto'
// import { ChangeResetPasswordDto } from './dto/changeResetPassword.dto'
// import { ChangeEmailDto } from './dto/changeEmail.dto'
// import { ChangePasswordDto } from './dto/changePassword.dto'


@Injectable()
export class SiteService {

    constructor(
        @InjectRepository(SiteEntity)
        private readonly siteRepository: Repository<SiteEntity>,
        // private readonly siteTemplateService: SiteTemplateService
    ) {}

    /** Получение всех сайтов (защищённый маршрут) */
    async getAllSites(user: UserEntity): Promise<SiteEntity[]> {
        // Получение всех сайтов пользователя
        return await this.siteRepository.find({userId: user.id})
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

        return await this.siteRepository.save(newSite)
    }

    async updateSite(id: number, updateSiteDto: UpdateSiteDto): Promise<SiteEntity> {
        // Найти сайт, который нужно обновить
        const site = await this.siteRepository.findOne({ id })

        // Throw an error if site is not exist
        if (!site) responseCommonError('site_UpdateSiteDto_EmptyUserId')

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
        // await this.siteTemplateService.deleteSiteTemplates(siteId)

        // =================================
        // Удалить папки шаблонов компонентов
        // await ComponentsFoldersModel.deleteMany({siteId: req.params.siteId})

        // Удалить шаблоны компонентов
        // await ComponentModel.deleteMany({siteId: req.params.siteId})

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
