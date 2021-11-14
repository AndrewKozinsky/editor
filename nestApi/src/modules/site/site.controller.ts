import {
    Req, Res, Get, Post, Patch, Param, Body,
    Controller, HttpStatus, UseGuards, UsePipes, Delete
} from '@nestjs/common'
import { SiteService } from './site.service'
import { Response } from 'express'
import { ExpressRequestInterface } from '../../types/expressRequest.interface'
import { BackendValidationPipe } from 'src/utils/error/backendValidation.pipe'
import { CreateSiteDto } from './dto/createSite.dto'
import { UserEntity } from '../user/user.entity'
import { User } from '../user/decorators/user.decorator'
import { AuthGuard } from '../user/guards/auth.guard'
import { UpdateSiteDto } from './dto/updateSite.dto'
import { SiteTemplateService } from '../siteTemplate/siteTemplate.service'
import { CompFolderService } from '../compFolder/compFolder.service'
import {CompFolderEntity} from '../compFolder/compFolder.entity'


@Controller('sites')
export class SiteController {
    constructor(
        private readonly siteService: SiteService,
        private readonly siteTemplateService: SiteTemplateService,
        private readonly compFolderService: CompFolderService
    ) {}


    // ПАПКА С КОМПОНЕНТАМИ =========================================

    // Получение папки с компонентами сайта
    @UseGuards(AuthGuard)
    @Get(':siteId/compFolders')
    async getCompFolderBySiteId(
        @Req() req: ExpressRequestInterface,
        @Param('siteId') siteId: number,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        const compFolder = await this.compFolderService.getCompFolderBySiteId(siteId)
        this.compFolderService.buildCompFolderResponse([compFolder], response)
    }

    // Удаление папки с компонентами сайта
    @UseGuards(AuthGuard)
    @Delete(':siteId/compFolders')
    async deleteCompFolderBySiteId(
        @Param('siteId') siteId: number,
        @Res({ passthrough: true }) response: Response,
        @User() currentUser: UserEntity,
    ): Promise<void> {
        await this.compFolderService.deleteCompFolderBySiteId(siteId, currentUser)
        this.compFolderService.buildCompFolderResponse([], response)
    }


    // ШАБЛОНЫ САЙТА =========================================

    // Получение всех шаблонов сайта
    @Get(':siteId/siteTemps')
    async getSiteTemplates(
        @Param('siteId') siteId: number,
        @Res({ passthrough: true }) response: Response
    ): Promise<void> {
        const siteTemplates = await this.siteTemplateService.getSiteTemplates(siteId)
        this.siteTemplateService.buildSiteTemplateResponse(siteTemplates, response)
    }


    // САЙТЫ =========================================

    @Get()
    async findAll(
        @Res({ passthrough: true }) response: Response,
        @User() currentUser: UserEntity,
    ): Promise<void> {
        const sites = await this.siteService.getAllSites(currentUser)
        this.siteService.buildSiteResponse(sites, response)
    }

    @Post('')
    @UsePipes(new BackendValidationPipe())
    @UseGuards(AuthGuard)
    async createSite(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
        @Body() createSiteDto: CreateSiteDto,
        @User() user: UserEntity,
    ): Promise<void> {
        const site = await this.siteService.createSite(createSiteDto, user)

        // Не забудь при создании сайта создавать запись в таблицах папок компонентах и в папках статей
        // Создание данных по модели ComponentsFolders
        /*await ComponentsFoldersModel.create({
            userId: req.user?.id,
            siteId: newSite._id
        })*/

        // Создание данных по модели ArticlesFolders
        /*await ArticlesFoldersModel.create({
            userId: req.user?.id,
            siteId: newSite._id
        })*/

        this.siteService.buildSiteResponse([site], response, HttpStatus.CREATED)
    }

    @Patch(':siteId')
    @UsePipes(new BackendValidationPipe())
    @UseGuards(AuthGuard)
    async changeSite(
        @Param('siteId') siteId: number,
        @Res({ passthrough: true }) response: Response,
        @Body() updateSiteDto: UpdateSiteDto
    ): Promise<void> {
        const updatedSite = await this.siteService.updateSite(siteId, updateSiteDto)
        this.siteService.buildSiteResponse([updatedSite], response)
    }

    @Delete(':siteId')
    @UseGuards(AuthGuard)
    async deleteSite(
        @Param('siteId') siteId: number,
        @Res({ passthrough: true }) response: Response,
        @User() currentUser: UserEntity
    ): Promise<void> {
        await this.siteService.deleteSite(siteId, currentUser)
        this.siteService.buildSiteResponse([], response)
    }
}
