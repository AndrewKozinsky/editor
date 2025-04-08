import { Response } from 'express'
import { Repository } from 'typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateComponentDto } from './dto/createComponent.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ComponentEntity } from './component.entity'
import { UserEntity } from '../user/user.entity'
import { ComponentResponseInterface } from './types/componentResponse.interface'
import { ExpressRequestInterface } from 'src/types/expressRequest.interface'
import { UpdateComponentDto } from './dto/updateComponent.dto'
import responseCommonError from 'src/utils/error/responseCommonError'
import { SiteEntity } from '../site/site.entity'
import {CompFolderEntity} from '../compFolder/compFolder.entity'


@Injectable()
export class ComponentService {

    constructor(
        @InjectRepository(ComponentEntity)
        private readonly componentRepository: Repository<ComponentEntity>,
        @InjectRepository(SiteEntity)
        private readonly siteRepository: Repository<SiteEntity>
    ) {}

    /** Получение компонентов сайта (защищённый маршрут) */
    async getComponentsBySiteId(siteId: number): Promise<ComponentEntity[]> {
        return await this.componentRepository.find({where: { siteId }})
    }

    /** Получение компонента (защищённый маршрут) */
    async getComponent(req: ExpressRequestInterface): Promise<ComponentEntity | null> {
        return await this.componentRepository.findOne({where: {id: parseInt(req.params.componentId)}})
    }

    /** Создание компонента (защищённый маршрут) */
    async createComponent(
        createComponentDto: CreateComponentDto, user: UserEntity
    ): Promise<ComponentEntity> {
        let newComponent = new ComponentEntity()

        newComponent = Object.assign(
            newComponent,
            {
                userId: user.id,
                ...createComponentDto
            }
        )

        // Проверка на существование указанного сайта
        const site = await this.siteRepository.findOne({where: { id: newComponent.siteId }})
        // Throw an error if site is not exist
        if (!site) {
            responseCommonError(
                'component_CreateComponent_SiteIsNotExist',
                HttpStatus.BAD_REQUEST
            )
        }

        return await this.componentRepository.save(newComponent)
    }

    async updateComponent(
        componentId: number, updateSiteTemplateDto: UpdateComponentDto
    ): Promise<ComponentEntity> {
        // Найти шаблон сайта, который нужно обновить
        const component = await this.componentRepository.findOne({where: { id: componentId }})

        // Throw an error if component is not exist
        if (!component) {
            responseCommonError(
                'component_UpdateComponent_ComponentIsNotExist',
                HttpStatus.BAD_REQUEST
            )
        }

        const updatedComponent = Object.assign(component, updateSiteTemplateDto)
        return await this.componentRepository.save(updatedComponent)
    }

    /** Удаление компонента (защищённый маршрут) */
    async deleteComponent(componentId: number, currentUser: UserEntity): Promise<null> {
        const component = await this.componentRepository.findOne({where: {id: componentId}})

        // Throw an error if site template is not exist
        if (!component) {
            responseCommonError('component_DeleteComponent_ComponentIsNotExist', HttpStatus.BAD_REQUEST)
        }

        // Бросить ошибку если текущий пользователь не создавал удаляемый компонент
        if (component.userId !== currentUser.id) {
            responseCommonError(
                'siteTemplate_DeleteSiteTemplate_CurrentUserIsNotAuthor',
                HttpStatus.FORBIDDEN
            )
        }

        await this.componentRepository.delete({id: componentId})
        return null
    }

    /** Удаление шаблонов сайта */
    async deleteComponents(siteId: number): Promise<null> {
        await this.componentRepository.delete({siteId})
        return null
    }


    /**
     * The function form response and send it to client
     * @param {Object} components — components data from database
     * @param {Object} response — response object
     * @param {Number} statusCode — status code
     */
    buildComponentResponse(
        components: ComponentEntity[],
        response: Response,
        statusCode: number = HttpStatus.OK
    ): void {
        const resBody: ComponentResponseInterface = {
            status: 'success',
            statusCode,
            data: {
                components: components
            }
        }

        response.send(resBody)
    }
}
