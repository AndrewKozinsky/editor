import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator'

export class CreateArtFolderDto {
    @IsNotEmpty({
        message: 'artFolder_CreateArtFolderDto_EmptySiteId'
    })
    @IsInt({
        message: 'artFolder_CreateArtFolderDto_siteIdIsNotANumber'
    })
    siteId: number

    @IsOptional()
    @IsString({
        message: 'artFolder_CreateArtFolderDto_contentIsNotAString'
    })
    content: string
}
