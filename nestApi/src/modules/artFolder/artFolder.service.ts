import { Response } from 'express'
import { Repository } from 'typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateArtFolderDto } from './dto/createArtFolder.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ArtFolderEntity } from './artFolder.entity'
import { UserEntity } from '../user/user.entity'
import { ArtFolderResponseInterface } from './types/artFolderResponse.interface'
import { UpdateArtFolderDto } from './dto/updateArtFolder.dto'
import responseCommonError from 'src/utils/error/responseCommonError'


@Injectable()
export class ArtFolderService {

    constructor(
        @InjectRepository(ArtFolderEntity)
        private readonly artFolderRepository: Repository<ArtFolderEntity>
    ) {}

    /** Получение папки со статьями сайта (защищённый маршрут) */
    async getArtFolderBySiteId(siteId: number): Promise<ArtFolderEntity> {
        return await this.artFolderRepository.findOne({ where: {siteId} })
    }

    /** Создание папки компонентов сайта (защищённый маршрут) */
    async createArtFolder(
        createArtFolderDto: CreateArtFolderDto, user: UserEntity
    ): Promise<ArtFolderEntity> {
        let newArtFolder = new ArtFolderEntity()
    //
        newArtFolder = Object.assign(
            newArtFolder,
            {
                userId: user.id,
                ...createArtFolderDto
            }
        )

        return await this.artFolderRepository.save(newArtFolder)
    }

    /** Изменение папки компонентов сайта (защищённый маршрут) */
    async updateArtFolder(
        artFolderId: number, updateSiteTemplateDto: UpdateArtFolderDto
    ): Promise<ArtFolderEntity> {
        // Найти папку с компонентами, которую нужно обновить
        const artFolder = await this.artFolderRepository.findOne({where: { id: artFolderId }})

        // Throw an error if artFolder is not exist
        if (!artFolder) {
            responseCommonError('artFolder_UpdateArtFolder_ArtFolderIsNotExist', HttpStatus.BAD_REQUEST)
        }

        const updatedArtFolder = Object.assign(artFolder, updateSiteTemplateDto)
        return await this.artFolderRepository.save(updatedArtFolder)
    }

    /** Удаление папки компонентов сайта (защищённый маршрут) */
    async deleteArtFolderBySiteId(
        siteId: number,
        currentUser: UserEntity
    ): Promise<null> {
        const artFolder = await this.artFolderRepository.findOne({where: {siteId}})

        // Throw an error if site template is not exist
        if (!artFolder) {
            responseCommonError('artFolder_DeleteArtFolder_ArtFolderIsNotExist', HttpStatus.BAD_REQUEST)
        }

        // Бросить ошибку если текущий пользователь не создавал удаляемый компонент
        if (artFolder.userId !== currentUser.id) {
            responseCommonError('artFolder_DeleteArtFolder_CurrentUserIsNotAuthor', HttpStatus.FORBIDDEN)
        }

        await this.artFolderRepository.delete({siteId})
        return null
    }


    /**
     * The function form response and send it to client
     * @param {Object} artFolders — artFolders data from database
     * @param {Object} response — response object
     * @param {Number} statusCode — status code
     */
    buildArtFolderResponse(
        artFolders: ArtFolderEntity[],
        response: Response,
        statusCode: number = HttpStatus.OK
    ): void {
        const resBody: ArtFolderResponseInterface = {
            status: 'success',
            statusCode,
            data: {
                artFolders: artFolders
            }
        }

        response.send(resBody)
    }
}
