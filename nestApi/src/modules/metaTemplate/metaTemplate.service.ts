import { Response } from 'express'
import { type } from 'os'
import { Repository } from 'typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import { SiteEntity } from '../site/site.entity'
import { CreateMetaTemplateDto } from './dto/createMetaTemplate.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { MetaTemplateEntity } from './metaTemplate.entity'
import { UserEntity } from '../user/user.entity'
import { MetaTemplatesResponseInterface } from './types/metaTemplatesResponse.interface'
import { ExpressRequestInterface } from 'src/types/expressRequest.interface'
import { UpdateMetaTemplateDto } from './dto/updateMetaTemplate.dto'
import responseCommonError from 'src/utils/error/responseCommonError'
import { sortByCreatedAt } from '../../utils/miscUtils'
import { SiteService } from '../site/site.service'


@Injectable()
export class MetaTemplateService {

    constructor(
        @InjectRepository(MetaTemplateEntity)
        private readonly metaTemplateRepository: Repository<MetaTemplateEntity>,
        @InjectRepository(SiteEntity)
        private readonly siteRepository: Repository<SiteEntity>,
        private readonly siteService: SiteService
    ) {}

    /** Получение шаблонов метаданных для переданного сайта (защищённый маршрут) */
    async getMetaTemplates(siteId: number): Promise<MetaTemplateEntity[]> {
        let templates = await this.metaTemplateRepository.find({where: {siteId}})

        // Отсортировать шаблоны по времени создания и вернуть
        return sortByCreatedAt(templates)
    }

    /** Получение шаблона сайта (защищённый маршрут) */
    async getMetaTemplate(req: ExpressRequestInterface): Promise<MetaTemplateEntity> {
        return await this.metaTemplateRepository.findOne({where: {id: parseInt(req.params.metaTemplateId)}})
    }

    /** Создание шаблона метаданных (защищённый маршрут) */
    async createMetaTemplate(createMetaTemplateDto: CreateMetaTemplateDto, user: UserEntity): Promise<MetaTemplateEntity> {
        let newMetaTemplate = new MetaTemplateEntity()

        newMetaTemplate = Object.assign(
            newMetaTemplate,
            {
                userId: user.id,
                ...createMetaTemplateDto
            }
        )

        // Бросить ошибку если указанный сайт не существует
        const site = await this.siteRepository.findOne({where: { id: newMetaTemplate.siteId }})
        if (!site) {
            responseCommonError('metaTemplate_CreateMetaTemplate_SiteIsNotExist', HttpStatus.BAD_REQUEST)
        }

        return await this.metaTemplateRepository.save(newMetaTemplate)
    }

    async updateMetaTemplate(
        metaTemplateId: number, updateSiteTemplateDto: UpdateMetaTemplateDto
    ): Promise<MetaTemplateEntity> {
        // Найти шаблон метаданных, который нужно обновить
        const metaTemplate = await this.metaTemplateRepository.findOne({where: { id: metaTemplateId }})

        // Throw an error if meta template is not exist
        if (!metaTemplate) {
            responseCommonError(
                'metaTemplate_UpdateMetaTemplate_MetaTemplateIsNotExist',
                HttpStatus.BAD_REQUEST
            )
        }

        const updatedSiteTemplate = Object.assign(metaTemplate, updateSiteTemplateDto)
        return await this.metaTemplateRepository.save(updatedSiteTemplate)
    }

    /** Удаление шаблон сайта (защищённый маршрут) */
    async deleteMetaTemplate(metaTemplateId: number, currentUser: UserEntity): Promise<null> {
        // По каким-то причинам metaTemplateId приходит строкой. Имей это в виду.
        const metaTemplate = await this.metaTemplateRepository.findOne({where: {id: metaTemplateId}})

        // Throw an error if meta template is not exist
        if (!metaTemplate) {
            responseCommonError(
                'metaTemplate_UpdateMetaTemplate_MetaTemplateIsNotExist',
                HttpStatus.BAD_REQUEST
            )
        }

        // Бросить ошибку если текущий пользователь не создавал удаляемый шаблон метаданных
        if (metaTemplate.userId !== currentUser.id) {
            responseCommonError(
                'metaTemplate_DeleteMetaTemplate_CurrentUserIsNotAuthor',
                HttpStatus.FORBIDDEN
            )
        }

        // Если удаляемый шаблон сайта является шаблоном сайта по умолчанию, то обнулить его
        const site = await this.siteRepository.findOne({where: {id: metaTemplate.siteId}})
        if (site.defaultMetaTemplateId == metaTemplateId) {
            await this.siteService.updateSite(site.id, {defaultMetaTemplateId: ''})
        }

        await this.metaTemplateRepository.delete({id: metaTemplateId})

        return null
    }

    /** Удаление шаблонов метаданных */
    async deleteMetaTemplates(siteId: number): Promise<null> {
        await this.metaTemplateRepository.delete({siteId})
        return null
    }


    /**
     * The function form response and send it to client
     * @param {Object} metaTemplates — meta templates data from database
     * @param {Object} response — response object
     * @param {Number} statusCode — status code
     */
    buildMetaTemplateResponse(
        metaTemplates: MetaTemplateEntity[],
        response: Response,
        statusCode: number = HttpStatus.OK
    ): void {
        const resBody: MetaTemplatesResponseInterface = {
            status: 'success',
            statusCode,
            data: {
                metaTemplates: metaTemplates
            }
        }

        response.send(resBody)
        return
    }
}
