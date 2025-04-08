import {IsInt, IsNotEmpty, IsString, MaxLength} from 'class-validator'
import {Column} from 'typeorm'

export class CreateSiteDto {
    @IsNotEmpty({message: 'site_CreateSiteDto_EmptyName'})
    @IsString({
        message: 'site_CreateSiteDto_contentIsNotAString'
    })
    @MaxLength( 255, {
        message: 'site_CreateSiteDto_nameTooLong'
    })
    name: string
}
