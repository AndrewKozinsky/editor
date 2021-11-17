import {IsNotEmpty, IsString} from 'class-validator'

export class UpdateCompFolderDto {
    @IsNotEmpty({
        message: 'compFolder_UpdateCompFolderDto_EmptyContent'
    })
    @IsString({
        message: 'compFolder_UpdateCompFolderDto_contentIsNotAString'
    })
    content: string
}
