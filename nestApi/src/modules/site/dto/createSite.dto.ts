import { IsNotEmpty, MaxLength } from 'class-validator'

export class CreateSiteDto {
    @IsNotEmpty({message: 'site_CreateSiteDto_EmptyName'})
    @MaxLength( 255, {
        message: 'site_CreateSiteDto_nameTooLong'
    })
    name: string

    defaultSiteTemplateId: string
}
