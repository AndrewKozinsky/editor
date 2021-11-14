import { IsNotEmpty } from 'class-validator'
import { Column } from 'typeorm'

export class CreateCompFolderDto {
    @IsNotEmpty({message: 'compFolder_CreateCompFolderDto_EmptySiteId'})
    @Column({type: 'integer'})
    siteId: number

    @IsNotEmpty({message: 'compFolder_CreateCompFolderDto_EmptyContent'})
    content: string
}
