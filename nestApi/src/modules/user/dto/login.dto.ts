import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator'

export class LoginDto {
    @MaxLength( 100)
    @IsEmail()
    @IsNotEmpty({message: 'createUser.emailIsEmpty'})
    readonly email: string

    @Length(6, 50)
    @IsNotEmpty()
    readonly password: string
}