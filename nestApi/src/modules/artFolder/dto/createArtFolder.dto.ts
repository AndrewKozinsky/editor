import {IsInt, IsNotEmpty, IsString} from 'class-validator'
import { Column } from 'typeorm'

export class CreateArtFolderDto {
    @IsNotEmpty({message: 'artFolder_CreateArtFolderDto_EmptySiteId'})
    @IsInt({
        message: 'artFolder_CreateArtFolderDto_siteIdIsNotANumber'
    })
    siteId: number

    @IsNotEmpty({message: 'artFolder_CreateArtFolderDto_EmptyContent'})
    @IsString({
        message: 'artFolder_CreateArtFolderDto_contentIsNotAString'
    })
    content: string
}
