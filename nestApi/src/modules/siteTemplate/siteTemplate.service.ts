import { Response } from 'express'
import { Repository } from 'typeorm'
import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { SiteController } from '../site/site.controller'
import { SiteEntity } from '../site/site.entity'
import { SiteService } from '../site/site.service'
import { CreateSiteTemplateDto } from './dto/createSiteTemplate.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { SiteTemplateEntity } from './siteTemplate.entity'
import { UserEntity } from '../user/user.entity'
import { SiteTemplatesResponseInterface } from './types/siteTemplatesResponse.interface'
import { ExpressRequestInterface } from 'src/types/expressRequest.interface'
import { UpdateSiteTemplateDto } from './dto/updateSiteTemplate.dto'
import responseCommonError from 'src/utils/error/responseCommonError'
import {sortByCreatedAt} from '../../utils/miscUtils'


@Injectable()
export class SiteTemplateService {
    constructor(
        @InjectRepository(SiteTemplateEntity)
        private readonly siteTemplateRepository: Repository<SiteTemplateEntity>,
        @InjectRepository(SiteEntity)
        private readonly siteRepository: Repository<SiteEntity>,
        // Такое подключение чтобы не было циклических зависимостей
        @Inject(forwardRef(() => SiteService))
        private siteService: SiteService,
    ) {}

    /** Получение шаблонов сайта (защищённый маршрут) */
    async getSiteTemplates(siteId: number): Promise<SiteTemplateEntity[]> {
        let templates = await this.siteTemplateRepository.find({where: {siteId}})

        // Отсортировать шаблоны по времени создания и вернуть
        return sortByCreatedAt(templates)
    }

    /** Получение шаблона сайта (защищённый маршрут) */
    async getSiteTemplate(req: ExpressRequestInterface): Promise<SiteTemplateEntity> {
        return await this.siteTemplateRepository.findOne({where: {id: parseInt(req.params.siteTemplateId)}})
    }

    /** Создание шаблона сайта (защищённый маршрут) */
    async createSiteTemplate(createSiteTemplateDto: CreateSiteTemplateDto, user: UserEntity): Promise<SiteTemplateEntity> {
        let newSiteTemplate = new SiteTemplateEntity()

        newSiteTemplate = Object.assign(
            newSiteTemplate,
            {
                userId: user.id,
                ...createSiteTemplateDto
            }
        )

        // Бросить ошибку если указанный сайт не существует
        const site = await this.siteRepository.findOne({where: { id: newSiteTemplate.siteId }})
        if (!site) {
            responseCommonError('siteTemplate_CreateSiteTemplate_SiteIsNotExist', HttpStatus.BAD_REQUEST)
        }

        return await this.siteTemplateRepository.save(newSiteTemplate)
    }

    async updateSiteTemplate(
        siteTemplateId: number, updateSiteTemplateDto: UpdateSiteTemplateDto
    ): Promise<SiteTemplateEntity> {
        // Найти шаблон сайта, который нужно обновить
        const siteTemplate = await this.siteTemplateRepository.findOne({where: { id: siteTemplateId }})

        // Throw an error if site template is not exist
        if (!siteTemplate) {
            responseCommonError(
                'siteTemplate_UpdateSiteTemplate_SiteTemplateIsNotExist',
                HttpStatus.BAD_REQUEST
            )
        }

        const updatedSiteTemplate = Object.assign(siteTemplate, updateSiteTemplateDto)
        return await this.siteTemplateRepository.save(updatedSiteTemplate)
    }

    /** Удаление шаблон сайта (защищённый маршрут) */
    async deleteSiteTemplate(siteTemplateId: number, currentUser: UserEntity): Promise<null> {
        const siteTemplate = await this.siteTemplateRepository.findOne({where: {id: siteTemplateId}})

        // Throw an error if site template is not exist
        if (!siteTemplate) {
            responseCommonError(
                'siteTemplate_DeleteSiteTemplate_SiteTemplateIsNotExists',
                HttpStatus.BAD_REQUEST
            )
        }

        // Бросить ошибку если текущий пользователь не создавал удаляемый шаблон сайта
        if (siteTemplate.userId !== currentUser.id) {
            responseCommonError(
                'siteTemplate_DeleteSiteTemplate_CurrentUserIsNotAuthor',
                HttpStatus.FORBIDDEN
            )
        }

        // Если удаляемый шаблон сайта является шаблоном сайта по умолчанию, то обнулить его
        const site = await this.siteRepository.findOne({where: {id: siteTemplate.siteId}})
        if (site.defaultSiteTemplateId === siteTemplateId) {
            await this.siteService.updateSite(site.id, {defaultSiteTemplateId: ''})
        }

        // Удалить шаблон сайта
        await this.siteTemplateRepository.delete({id: siteTemplateId})

        return null
    }

    /** Удаление шаблонов сайта */
    async deleteSiteTemplates(siteId: number): Promise<null> {
        await this.siteTemplateRepository.delete({siteId})
        return null
    }


    /**
     * The function form response and send it to client
     * @param {Object} siteTemplates — site templates data from database
     * @param {Object} response — response object
     * @param {Number} statusCode — status code
     */
    buildSiteTemplateResponse(
        siteTemplates: SiteTemplateEntity[],
        response: Response,
        statusCode: number = HttpStatus.OK
    ): void {
        const resBody: SiteTemplatesResponseInterface = {
            status: 'success',
            statusCode,
            data: {
                siteTemplates: siteTemplates
            }
        }

        response.send(resBody)
        return
    }
}
