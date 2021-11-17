import { IsNotEmpty, MaxLength } from 'class-validator'
import { Column } from 'typeorm'

export class CreateComponentDto {
    @IsNotEmpty({
        message: 'component_CreateComponentDto_EmptySiteId'
    })
    @Column({type: 'integer'})
    siteId: number

    @IsNotEmpty({
        message: 'component_CreateComponentDto_EmptyContent'
    })
    content: string
}
