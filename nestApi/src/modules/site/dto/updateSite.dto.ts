import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator'

export class UpdateSiteDto {
    @IsNotEmpty({message: 'site_UpdateSiteDto_EmptyName'})
    @IsString({
        message: 'site_UpdateSiteDto_nameIsNotAString'
    })
    @MaxLength( 255, {
        message: 'site_UpdateSiteDto_nameTooLong'
    })
    @IsOptional()
    name?: string

    @IsOptional()
    defaultSiteTemplateId?: number | ''

    @IsOptional()
    defaultMetaTemplateId?: number | ''
}
