import { Body, Controller, HttpStatus, Post, Req, Res, UsePipes } from '@nestjs/common'
import { Response } from 'express'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/createUser.dto'
import { ExpressRequestInterface } from '../../types/expressRequest.interface'
import { BackendValidationPipe } from 'src/utils/error/backendValidation.pipe'

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('getTokenData')
    @UsePipes(new BackendValidationPipe())
    async getTokenData(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        const user = await this.userService.getTokenData(req)
        this.userService.buildUserResponse(user, response)
    }

    @Post('signup')
    @UsePipes(new BackendValidationPipe())
    async createUser(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
        @Body() createUserDto: CreateUserDto
    ): Promise<void> {
        const language = req.headers['Editor-Language']
        const user = await this.userService.createUser(createUserDto, language)
        this.userService.buildUserResponse(user, response, false, HttpStatus.CREATED)
    }

    @Post('login')
    @UsePipes(new BackendValidationPipe())
    async login(
        @Res({ passthrough: true }) response: Response,
        @Body() createUserDto: CreateUserDto
    ): Promise<void> {
        const user = await this.userService.login(createUserDto)
        this.userService.buildUserResponse(user, response)
    }
}