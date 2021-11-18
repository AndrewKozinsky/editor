import {IsNotEmpty, IsString} from 'class-validator'

export class UpdateArtFolderDto {
    @IsNotEmpty({message: 'artFolder_UpdateArtFolderDto_EmptyContent'})
    @IsString({
        message: 'artFolder_UpdateArtFolderDto_contentIsNotAString'
    })
    content: string
}
