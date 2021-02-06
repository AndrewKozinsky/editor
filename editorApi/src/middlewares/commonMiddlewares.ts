import {Request, Response, NextFunction} from 'express'

/**
 * Middleware ставит в req.headers.lang английский если язык не передан
 * @param {Request} req — объект запроса
 * @param {Response} res – объект ответа
 * @param {NextFunction} next — функция перехода к следуьшей промежуточной функции
 */
export function addLanguage(req: Request, res: Response, next: NextFunction) {

    // Если язык не передан, то поставить английский
    if (!req.get('Accept-Language')) req.headers['Accept-Language'] = 'eng'

    next()
}