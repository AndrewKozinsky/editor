import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator'

export class CreateUserDto {
    readonly name: string

    @MaxLength( 100, {
        message: 'user_CreateUserDto_emailTooLong'
    })
    @IsEmail({}, { message: 'user_CreateUserDto_itIsNotEmail' })
    @IsNotEmpty({message: 'user_CreateUserDto_EmptyEmail'})
    readonly email: string

    @Length(6, 50, {
        message: 'user_CreateUserDto_passwordIsOutOfRange'
    })
    @IsNotEmpty({
        message: 'user_CreateUserDto_passwordIsEmpty'
    })
    readonly password: string
}