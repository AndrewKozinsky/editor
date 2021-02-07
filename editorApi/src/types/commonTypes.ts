import {Request, Response, NextFunction} from 'express'
import {IUser} from '../models/user'

// Объект с данными токена
export type JWTDecodedType = {
    id: string, iat: number, exp: number
}

export interface ExtendedRequestType extends Request {
    user?: IUser
}