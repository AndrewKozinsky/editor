import { IsNotEmpty } from 'class-validator'

export class UpdateComponentDto {
    @IsNotEmpty({message: 'component_UpdateComponentDto_EmptyContent'})
    content: string
}
