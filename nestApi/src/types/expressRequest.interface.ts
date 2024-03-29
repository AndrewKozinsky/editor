import { UserEntity } from '../modules/user/user.entity'
import MiscTypes from './miscTypes'

export interface ExpressRequestInterface extends Request {
    user?: UserEntity
    headers: UpdatedHeaders
    cookies: MiscTypes.ObjStringKey<string>
    params: { [key: string]: string }
}

interface UpdatedHeaders extends Headers {
    'Editor-Language': MiscTypes.Language
    authorization?: string
}
