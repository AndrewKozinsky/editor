import {
    Req, Res, Get, Post, Patch, Param, Body,
    Controller, HttpStatus, UseGuards, UsePipes, Delete
} from '@nestjs/common'
import { MetaTemplateService } from './metaTemplate.service'
import { Response } from 'express'
import { ExpressRequestInterface } from '../../types/expressRequest.interface'
import { BackendValidationPipe } from 'src/utils/error/backendValidation.pipe'
import { CreateMetaTemplateDto } from './dto/createMetaTemplate.dto'
import { UserEntity } from '../user/user.entity'
import { User } from '../user/decorators/user.decorator'
import { AuthGuard } from '../user/guards/auth.guard'
import { UpdateMetaTemplateDto } from './dto/updateMetaTemplate.dto'


@Controller('metaTemplates')
export class MetaTemplateController {
    constructor(private readonly metaTemplateService: MetaTemplateService) {}

    // Получение шаблона метаданных
    @UseGuards(AuthGuard)
    @Get(':metaTemplateId')
    async findOne(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        const metaTemplate = await this.metaTemplateService.getMetaTemplate(req)
        this.metaTemplateService.buildMetaTemplateResponse([metaTemplate], response, HttpStatus.CREATED)
    }

    // Создание шаблона метаданных
    @UseGuards(AuthGuard)
    @Post('')
    @UsePipes(new BackendValidationPipe())
    async createMetaTemplate(
        @Body() createMetaTemplateDto: CreateMetaTemplateDto,
        @Res({ passthrough: true }) response: Response,
        @User() currentUser: UserEntity,
    ): Promise<void> {
        const metaTemplate = await this.metaTemplateService.createMetaTemplate(createMetaTemplateDto, currentUser)
        this.metaTemplateService.buildMetaTemplateResponse([metaTemplate], response, HttpStatus.CREATED)
    }

    // Изменение шаблона метаданных
    @Patch(':metaTemplateId')
    @UsePipes(new BackendValidationPipe())
    @UseGuards(AuthGuard)
    async changeMetaTemplate(
        @Param('metaTemplateId') metaTemplateId: number,
        @Res({ passthrough: true }) response: Response,
        @Body() updateMetaTemplateDto: UpdateMetaTemplateDto
    ): Promise<void> {
        const updatedMetaTemplate = await this.metaTemplateService.updateMetaTemplate(metaTemplateId, updateMetaTemplateDto)
        this.metaTemplateService.buildMetaTemplateResponse([updatedMetaTemplate], response)
    }

    // Удаление шаблона метаданных
    @Delete(':metaTemplateId')
    @UseGuards(AuthGuard)
    async deleteMetaTemplate(
        @Param('metaTemplateId') metaTemplateId: number,
        @Res({ passthrough: true }) response: Response,
        @User() currentUser: UserEntity
    ): Promise<void> {
        await this.metaTemplateService.deleteMetaTemplate(metaTemplateId, currentUser)
        this.metaTemplateService.buildMetaTemplateResponse([], response)
    }
}
