import { IsNotEmpty } from 'class-validator'

export class UpdateCompFolderDto {
    @IsNotEmpty({message: 'compFolder_UpdateCompFolderDto_EmptyContent'})
    content: string
}
