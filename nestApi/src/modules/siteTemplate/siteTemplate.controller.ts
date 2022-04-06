import {
    Req, Res, Get, Post, Patch, Param, Body,
    Controller, HttpStatus, UseGuards, UsePipes, Delete
} from '@nestjs/common'
import { SiteService } from '../site/site.service'
import { SiteTemplateService } from './siteTemplate.service'
import { Response } from 'express'
import { ExpressRequestInterface } from '../../types/expressRequest.interface'
import { BackendValidationPipe } from 'src/utils/error/backendValidation.pipe'
import { CreateSiteTemplateDto } from './dto/createSiteTemplate.dto'
import { UserEntity } from '../user/user.entity'
import { User } from '../user/decorators/user.decorator'
import { AuthGuard } from '../user/guards/auth.guard'
import { UpdateSiteTemplateDto } from './dto/updateSiteTemplate.dto'


@Controller('siteTemplates')
export class SiteTemplateController {
    constructor(
        private readonly siteTemplateService: SiteTemplateService,
    ) {}

    // Получение шаблона сайта
    @UseGuards(AuthGuard)
    @Get(':siteTemplateId')
    async findOne(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        const siteTemplate = await this.siteTemplateService.getSiteTemplate(req)
        this.siteTemplateService.buildSiteTemplateResponse([siteTemplate], response, HttpStatus.CREATED)
    }

    // Создание шаблона сайта
    @UseGuards(AuthGuard)
    @Post('')
    @UsePipes(new BackendValidationPipe())
    async createSiteTemplate(
        @Body() createSiteTemplateDto: CreateSiteTemplateDto,
        @Res({ passthrough: true }) response: Response,
        @User() currentUser: UserEntity,
    ): Promise<void> {
        const siteTemplate = await this.siteTemplateService.createSiteTemplate(createSiteTemplateDto, currentUser)
        this.siteTemplateService.buildSiteTemplateResponse([siteTemplate], response, HttpStatus.CREATED)
    }

    @Patch(':siteTemplateId')
    @UsePipes(new BackendValidationPipe())
    @UseGuards(AuthGuard)
    async changeSiteTemplate(
        @Param('siteTemplateId') siteTemplateId: number,
        @Res({ passthrough: true }) response: Response,
        @Body() updateSiteTemplateDto: UpdateSiteTemplateDto
    ): Promise<void> {
        const updatedSiteTemplate = await this.siteTemplateService.updateSiteTemplate(siteTemplateId, updateSiteTemplateDto)
        this.siteTemplateService.buildSiteTemplateResponse([updatedSiteTemplate], response)
    }

    @Delete(':siteTemplateId')
    @UseGuards(AuthGuard)
    async deleteSiteTemplate(
        @Param('siteTemplateId') siteTemplateId: number,
        @Res({ passthrough: true }) response: Response,
        @User() currentUser: UserEntity
    ): Promise<void> {
        await this.siteTemplateService.deleteSiteTemplate(siteTemplateId, currentUser)
        this.siteTemplateService.buildSiteTemplateResponse([], response)
    }
}
