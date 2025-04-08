import {
    Req, Res, Get, Post, Patch, Param, Body,
    Controller, HttpStatus, UseGuards, UsePipes, Delete
} from '@nestjs/common'
import { ComponentService } from './component.service'
import { Response } from 'express'
import { ExpressRequestInterface } from '../../types/expressRequest.interface'
import { BackendValidationPipe } from 'src/utils/error/backendValidation.pipe'
import { CreateComponentDto } from './dto/createComponent.dto'
import { UserEntity } from '../user/user.entity'
import { User } from '../user/decorators/user.decorator'
import { AuthGuard } from '../user/guards/auth.guard'
import { UpdateComponentDto } from './dto/updateComponent.dto'


@Controller('components')
export class ComponentController {
    constructor(private readonly componentService: ComponentService) {}

    // Получение компонента
    @UseGuards(AuthGuard)
    @Get(':componentId')
    async findOne(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        const component = await this.componentService.getComponent(req)
        this.componentService.buildComponentResponse([component], response)
    }

    // Создание компонента
    @UseGuards(AuthGuard)
    @Post('')
    @UsePipes(new BackendValidationPipe())
    async createComponent(
        @Body() createComponentDto: CreateComponentDto,
        @Res({ passthrough: true }) response: Response,
        @User() currentUser: UserEntity,
    ): Promise<void> {
        const component = await this.componentService.createComponent(createComponentDto, currentUser)
        this.componentService.buildComponentResponse([component], response, HttpStatus.CREATED)
    }

    // Изменение компонента
    @Patch(':componentId')
    @UsePipes(new BackendValidationPipe())
    @UseGuards(AuthGuard)
    async changeComponent(
        @Param('componentId') componentId: number,
        @Res({ passthrough: true }) response: Response,
        @Body() updateComponentDto: UpdateComponentDto
    ): Promise<void> {
        const updatedComponent = await this.componentService.updateComponent(componentId, updateComponentDto)
        this.componentService.buildComponentResponse([updatedComponent], response)
    }

    // Удаление компонента
    @Delete(':componentId')
    @UseGuards(AuthGuard)
    async deleteSiteTemplate(
        @Param('componentId') componentId: number,
        @Res({ passthrough: true }) response: Response,
        @User() currentUser: UserEntity
    ): Promise<void> {
        await this.componentService.deleteComponent(componentId, currentUser)
        this.componentService.buildComponentResponse([], response)
    }
}
