import {IsNotEmpty, IsString} from 'class-validator'

export class UpdateComponentDto {
    @IsNotEmpty({
        message: 'component_UpdateComponentDto_EmptyContent'
    })
    @IsString({
        message: 'component_UpdateComponentDto_contentIsNotAString'
    })
    content: string
}
