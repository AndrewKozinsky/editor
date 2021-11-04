import { IsNotEmpty, MaxLength } from 'class-validator'
import {Column} from 'typeorm'

export class UpdateSiteDto {
    @IsNotEmpty({message: 'site_UpdateSiteDto_EmptyName'})
    @MaxLength( 255, {
        message: 'site_UpdateSiteDto_nameTooLong'
    })
    name: string

    @Column({type: 'integer'})
    defaultSiteTemplateId: number
}
