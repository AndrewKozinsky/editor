import {
    Res, Post, Patch, Param, Body,
    Controller, HttpStatus, UseGuards, UsePipes
} from '@nestjs/common'
import { CompFolderService } from './compFolder.service'
import { Response } from 'express'
import { ExpressRequestInterface } from '../../types/expressRequest.interface'
import { BackendValidationPipe } from 'src/utils/error/backendValidation.pipe'
import { CreateCompFolderDto } from './dto/createCompFolder.dto'
import { UserEntity } from '../user/user.entity'
import { User } from '../user/decorators/user.decorator'
import { AuthGuard } from '../user/guards/auth.guard'
import { UpdateCompFolderDto } from './dto/updateCompFolder.dto'


@Controller('compFolders')
export class CompFolderController {
    constructor(private readonly compFolderService: CompFolderService) {}

    // Создание папки c компонентами
    @UseGuards(AuthGuard)
    @Post('')
    @UsePipes(new BackendValidationPipe())
    async createCompFolder(
        @Body() createCompFolderDto: CreateCompFolderDto,
        @Res({ passthrough: true }) response: Response,
        @User() currentUser: UserEntity,
    ): Promise<void> {
        const compFolder = await this.compFolderService.createCompFolder(createCompFolderDto, currentUser)
        this.compFolderService.buildCompFolderResponse([compFolder], response, HttpStatus.CREATED)
    }

    // Изменение папки c компонентами
    @Patch(':compFolderId')
    @UsePipes(new BackendValidationPipe())
    @UseGuards(AuthGuard)
    async changeCompFolder(
        @Param('compFolderId') compFolderId: number,
        @Res({ passthrough: true }) response: Response,
        @Body() updateCompFolderDto: UpdateCompFolderDto
    ): Promise<void> {
        const updatedCompFolder = await this.compFolderService.updateCompFolder(compFolderId, updateCompFolderDto)
        this.compFolderService.buildCompFolderResponse([updatedCompFolder], response)
    }
}
