import { IsNotEmpty, MaxLength } from 'class-validator'
import { Column } from 'typeorm'

export class CreateComponentDto {
    @IsNotEmpty({message: 'component_CreateComponentDto_EmptySiteId'})
    @Column({type: 'integer'})
    siteId: number

    // СЧИТАЮ, ЧТО ЭТО НЕ ТРЕБУЕТСЯ
    // @IsNotEmpty({message: 'component_CreateComponentDto_EmptyCompFolderId'})
    // @Column({type: 'integer'})
    // compFolderId: number

    @IsNotEmpty({message: 'component_CreateComponentDto_EmptyContent'})
    content: string
}
