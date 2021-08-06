import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UsePipes } from '@nestjs/common'
import { Response } from 'express'
import { UserService } from './user.service'
// import { CreateUserDto } from './dto/createUser.dto'
import { ExpressRequestInterface } from '../../types/expressRequest.interface'
import { BackendValidationPipe } from 'src/utils/error/backendValidation.pipe'
// import { LoginDto } from './dto/login.dto'
// import { SendConfirmLetterDto } from './dto/sendConfirmLetter.dto'
// import { Param } from '@nestjs/common'
// import { ResetPasswordDto } from './dto/resetPassword.dto'
// import { Patch } from '@nestjs/common'
// import { ChangeResetPasswordDto } from './dto/changeResetPassword.dto'
// import { ChangeEmailDto } from './dto/changeEmail.dto'
// import { AuthGuard } from './guards/auth.guard'

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

    // @Post('signup')
    // @UsePipes(new BackendValidationPipe())
    /*async createUser(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
        @Body() createUserDto: CreateUserDto
    ): Promise<void> {
        const language = req.headers['Editor-Language']
        const user = await this.userService.createUser(createUserDto, language)
        this.userService.buildUserResponse(user, response, HttpStatus.CREATED)
    }*/

    // @Post('login')
    // @UsePipes(new BackendValidationPipe())
    /*async login(
        @Res({ passthrough: true }) response: Response,
        @Body() loginDto: LoginDto
    ): Promise<void> {
        const user = await this.userService.login(loginDto)
        this.userService.buildUserResponse(user, response, HttpStatus.OK, true  )
    }*/

    // @Post('sendConfirmLetter')
    // @UsePipes(new BackendValidationPipe())
    /*async sendConfirmLetter(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
        @Body() sendConfirmLetterDto: SendConfirmLetterDto
    ): Promise<void> {
        const language = req.headers['Editor-Language']
        const user = await this.userService.sendConfirmLetter(sendConfirmLetterDto, language)
        this.userService.buildUserResponse(user, response)
    }*/

    // @Get('confirmEmail/:token')
    // @UsePipes(new BackendValidationPipe())
    /*async confirmEmail(
        @Param('token') token: string,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        const user = await this.userService.confirmEmail(token)
        this.userService.buildUserResponse(user, response)
    }*/

    // @Post('resetPassword')
    // @UsePipes(new BackendValidationPipe())
    /*async resetPassword(
        @Req() req: ExpressRequestInterface,
        @Res({ passthrough: true }) response: Response,
        @Body() resetPasswordDto: ResetPasswordDto
    ): Promise<void> {
        const language = req.headers['Editor-Language']
        const user = await this.userService.resetPassword(resetPasswordDto, language)
        this.userService.buildUserResponse(user, response)
    }*/

    // @Patch('resetPassword/:token')
    // @UsePipes(new BackendValidationPipe())
    /*async changeResetPassword(
        @Param('token') token: string,
        @Res({ passthrough: true }) response: Response,
        @Body() changeResetPasswordDto: ChangeResetPasswordDto
    ): Promise<void> {
        const user = await this.userService.changeResetPassword(changeResetPasswordDto, token)
        this.userService.buildUserResponse(user, response, HttpStatus.OK, true)
    }*/

    // @Patch('changeEmail')
    // @UsePipes(new BackendValidationPipe())
    // @UseGuards(AuthGuard)
    /*async changeEmail(
        @Res({ passthrough: true }) response: Response,
        @Body() changeEmailDto: ChangeEmailDto
    ): Promise<void> {
        // const user = await this.userService.changeEmail(changeEmailDto)
        // this.userService.buildUserResponse(user, response, HttpStatus.OK)
    }*/
}
