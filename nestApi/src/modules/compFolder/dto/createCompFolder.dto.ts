import {IsInt, IsNotEmpty, IsOptional, IsString} from 'class-validator'

export class CreateCompFolderDto {
    @IsNotEmpty({
        message: 'compFolder_CreateCompFolderDto_EmptySiteId'
    })
    @IsInt({
        message: 'compFolder_CreateCompFolderDto_siteIdIsNotANumber'
    })
    siteId: number

    @IsOptional()
    @IsString({
        message: 'compFolder_CreateCompFolderDto_contentIsNotAString'
    })
    content: string
}
