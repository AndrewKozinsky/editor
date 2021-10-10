import { IsNotEmpty, MaxLength } from 'class-validator'

export class UpdateSiteDto {
    @IsNotEmpty({message: 'site_UpdateSiteDto_EmptyName'})
    @MaxLength( 255, {
        message: 'site_UpdateSiteDto_nameTooLong'
    })
    name: string

    defaultIncFilesTemplateId: string
}
