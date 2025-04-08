import { Response } from 'express'
import { Repository } from 'typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateCompFolderDto } from './dto/createCompFolder.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { CompFolderEntity } from './compFolder.entity'
import { UserEntity } from '../user/user.entity'
import { CompFolderResponseInterface } from './types/compFolderResponse.interface'
import { UpdateCompFolderDto } from './dto/updateCompFolder.dto'
import responseCommonError from 'src/utils/error/responseCommonError'


@Injectable()
export class CompFolderService {

    constructor(
        @InjectRepository(CompFolderEntity)
        private readonly compFolderRepository: Repository<CompFolderEntity>
    ) {}

    /** Получение папки с компонентами сайта (защищённый маршрут) */
    async getCompFolderBySiteId(siteId: number): Promise<CompFolderEntity> {
        return await this.compFolderRepository.findOne({where: { siteId }})
    }

    /** Создание папки компонентов сайта (защищённый маршрут) */
    async createCompFolder(
        createCompFolderDto: CreateCompFolderDto, user: UserEntity
    ): Promise<CompFolderEntity> {
        let newCompFolder = new CompFolderEntity()

        newCompFolder = Object.assign(
            newCompFolder,
            {
                userId: user.id,
                ...createCompFolderDto
            }
        )

        return await this.compFolderRepository.save(newCompFolder)
    }

    /** Изменение папки компонентов сайта (защищённый маршрут) */
    async updateCompFolder(
        compFolderId: number, updateSiteTemplateDto: UpdateCompFolderDto
    ): Promise<CompFolderEntity> {
        // Найти папку с компонентами, которую нужно обновить
        const compFolder = await this.compFolderRepository.findOne({where: { id: compFolderId }})

        // Throw an error if compFolder is not exist
        if (!compFolder) {
            responseCommonError(
                'compFolder_UpdateCompFolder_CompFolderIsNotExist',
                HttpStatus.BAD_REQUEST
            )
        }

        const updatedCompFolder = Object.assign(compFolder, updateSiteTemplateDto)
        return await this.compFolderRepository.save(updatedCompFolder)
    }

    /** Удаление папки компонентов сайта (защищённый маршрут) */
    async deleteCompFolderBySiteId(
        siteId: number,
        currentUser: UserEntity
    ): Promise<null> {
        const compFolder = await this.compFolderRepository.findOne({where: {siteId}})

        // Throw an error if site template is not exist
        if (!compFolder) {
            responseCommonError(
                'compFolder_DeleteCompFolder_CompFolderIsNotExist',
                HttpStatus.BAD_REQUEST
            )
        }

        // Бросить ошибку если текущий пользователь не создавал удаляемый компонент
        if (compFolder.userId !== currentUser.id) {
            responseCommonError('compFolder_DeleteCompFolder_CurrentUserIsNotAuthor', HttpStatus.FORBIDDEN)
        }

        await this.compFolderRepository.delete({siteId})
        return null
    }


    /**
     * The function form response and send it to client
     * @param {Object} compFolders — compFolders data from database
     * @param {Object} response — response object
     * @param {Number} statusCode — status code
     */
    buildCompFolderResponse(
        compFolders: CompFolderEntity[],
        response: Response,
        statusCode: number = HttpStatus.OK
    ): void {
        const resBody: CompFolderResponseInterface = {
            status: 'success',
            statusCode,
            data: {
                compFolders: compFolders
            }
        }

        response.send(resBody)
    }
}
