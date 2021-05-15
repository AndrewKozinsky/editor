import { Response, NextFunction } from 'express'
import { catchAsync } from '../../utils/errors/catchAsync'
import { ExtendedRequestType } from '../../types/commonTypes'
import SiteModel from '../../models/site'
import IncludedFilesTemplateModel from '../../models/includedFilesTemplate';


/** Получение всех сайтов (защищённый маршрут) */
export const getAllSites = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    // Эта проверка требуется только для TS. Сам пользователь будет потому что это защищённый маршрут.
    if (!req.user) return

    // Получение всех сайтов пользователя
    const sites = await SiteModel.find({userId: req.user.id}).select('-__v -userId')


    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            sites
        }
    })
})


/** Создание сайта (защищённый маршрут) */
export const createSite = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    // Эта проверка требуется только для TS. Сам пользователь будет потому что это защищённый маршрут.
    if (!req.user) return

    // Создание нового сайта
    const newSite = await SiteModel.create({
        name: req.body.name,
        userId: req.user.id,
    })

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            site: {
                id: newSite._id,
                name: newSite.name,
            }
        }
    })
})

/** Частичное изменение сайта (защищённый маршрут) */
export const updateSite = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    // Найти сайт и обновить его данные
    const updatedSite = await SiteModel.findByIdAndUpdate(
        req.params.siteId,
        req.body,
        {new: true}
    ).select('-_v')

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            site: updatedSite
        }
    })
})


/** Удаление сайта (защищённый маршрут) */
export const deleteSite = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    // Удалить сайт из БД
    await SiteModel.findByIdAndDelete(
        req.params.siteId
    )

    // Удалить шаблоны подключения внешних файлов
    await IncludedFilesTemplateModel.deleteMany({siteId: req.params.siteId})

    // TODO ПОСЛЕ ДОПИШИ УДАЛЕНИЕ ВСЕГО, ЧТО ОТНОСИТСЯ К САЙТУ: ШАБЛОНЫ КОМПОНЕНТОВ, СТАТЬИ

    // Отправить успешный ответ
    res.status(200).json({
        status: 'success'
    })
})