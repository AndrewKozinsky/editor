import {
    Res, Post, Patch, Param, Body,
    Controller, HttpStatus, UseGuards, UsePipes
} from '@nestjs/common'
import { ArtFolderService } from './artFolder.service'
import { Response } from 'express'
import { BackendValidationPipe } from 'src/utils/error/backendValidation.pipe'
import { CreateArtFolderDto } from './dto/createArtFolder.dto'
import { UserEntity } from '../user/user.entity'
import { User } from '../user/decorators/user.decorator'
import { AuthGuard } from '../user/guards/auth.guard'
import { UpdateArtFolderDto } from './dto/updateArtFolder.dto'


@Controller('artFolders')
export class ArtFolderController {
    constructor(private readonly artFolderService: ArtFolderService) {}

    // Создание папки c компонентами
    @UseGuards(AuthGuard)
    @Post('')
    @UsePipes(new BackendValidationPipe())
    async createArtFolder(
        @Body() createArtFolderDto: CreateArtFolderDto,
        @Res({ passthrough: true }) response: Response,
        @User() currentUser: UserEntity,
    ): Promise<void> {
        const artFolder = await this.artFolderService.createArtFolder(createArtFolderDto, currentUser)
        this.artFolderService.buildArtFolderResponse([artFolder], response, HttpStatus.CREATED)
    }

    // Изменение папки c компонентами
    @Patch(':artFolderId')
    @UsePipes(new BackendValidationPipe())
    @UseGuards(AuthGuard)
    async changeArtFolder(
        @Param('artFolderId') artFolderId: number,
        @Res({ passthrough: true }) response: Response,
        @Body() updateArtFolderDto: UpdateArtFolderDto
    ): Promise<void> {
        const updatedArtFolder = await this.artFolderService.updateArtFolder(artFolderId, updateArtFolderDto)
        this.artFolderService.buildArtFolderResponse([updatedArtFolder], response)
    }
}
