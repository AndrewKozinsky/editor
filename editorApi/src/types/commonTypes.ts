import {Request, Response, NextFunction} from 'express'

export type RouteFn = (req: Request, res: Response, next?: NextFunction) => void
