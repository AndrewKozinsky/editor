import {Request, Response, NextFunction} from 'express'

/**
 * Middleware ставит в req.headers дополнительные заголовки если они не переданы
 * @param {Request} req — объект запроса
 * @param {Response} res – объект ответа
 * @param {NextFunction} next — функция перехода к следуьшей промежуточной функции
 */
export function addExtraHeaders(req: Request, res: Response, next: NextFunction) {

    // Если язык не передан, то поставить английский
    if (!req.get('Editor-Language')) req.headers['Editor-Language'] = 'eng'

    // Если не передан источник запроса, то поставить api
    if (!req.get('Editor-Request-Source')) req.headers['Editor-Request-Source'] = 'api'

    next()
}