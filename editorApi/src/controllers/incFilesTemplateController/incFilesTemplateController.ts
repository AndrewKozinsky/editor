import { Response, NextFunction } from 'express'
import { catchAsync } from '../../utils/errors/catchAsync'
import { ExtendedRequestType } from '../../types/commonTypes'
import IncFilesTemplateModel from '../../models/incFilesTemplate'
import {AppError} from '../../utils/errors/appError'
import SiteModel from '../../models/site';


/** Получение всех шаблонов определённого сайта (защищённый маршрут) */
export const getSiteTemplates = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    // Эта проверка требуется только для TS. Сам пользователь будет потому что это защищённый маршрут.
    if (!req.user) return

    // Если не передали id сайта, то возвратить ошибочный ответ
    if (!req.query.siteId) {
        return next(
            new AppError(null, '{{incFilesTemplateController.getTemplateNoSiteId}}', 400)
        )
    }

    // Получение всех шаблонов сайта с переданным id
    const siteId: string = req.query.siteId.toString()
    const templates = await IncFilesTemplateModel.find({siteId}).select('-__v -userId')

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            templates
        }
    })
})



/** Создание шаблона (защищённый маршрут) */
export const createTemplate = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    // Эта проверка требуется только для TS. Сам пользователь будет потому что это защищённый маршрут.
    if (!req.user) return

    // Если не передали имя шаблона, то возвратить ошибочный ответ
    if (!req.body.name) {
        return next(
            new AppError('name', '{{incFilesTemplateController.createTemplateNoName}}', 400)
        )
    }

    // Если не передали id сайта, к которому должен принадлежать шаблон,
    // то возвратить ошибочный ответ
    if (!req.body.siteId) {
        return next(
            new AppError('name', '{{incFilesTemplateController.createTemplateNoSiteId}}', 400)
        )
    }

    // Создание нового шаблона
    let newTemplate = await IncFilesTemplateModel.create({
        name: req.body.name,
        userId: req.user.id,
        siteId: req.body.siteId,
        codeInHead: req.body.codeInHead || null,
        codeBeforeEndBody: req.body.codeBeforeEndBody || null
    })

    newTemplate.__v = undefined

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            template: newTemplate
        }
    })
})


/** Изменение данных шаблона (защищённый маршрут) */
export const updateTemplate = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Найти сайт и обновить его данные
    const updatedTemplate = await IncFilesTemplateModel.findByIdAndUpdate(
        req.params.templateId,
        req.body,
        {new: true}
    ).select('-_v')

    // Если не найден шаблон, то возвратить ошибочный ответ
    if (!updatedTemplate) {
        return next(
            new AppError('name', '{{incFilesTemplateController.updateTemplateNotFound}}', 400)
        )
    }

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            template: updatedTemplate
        }
    })
})



/** Удаление шаблона (защищённый маршрут) */
export const deleteTemplate = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    // Удалить шаблон из БД
    await IncFilesTemplateModel.findByIdAndDelete(
        req.params.templateId
    )

    // Проверю в сайтах, не стоит ли id удаляемого шаблона как id шаблона по умолчанию.
    // Если стоит, то очищу в сайте свойство defaultIncFilesTemplateId
    const siteWithThisTemplate = await SiteModel.findOne({defaultIncFilesTemplateId: req.params.templateId})
    if (siteWithThisTemplate) {
        await SiteModel.findByIdAndUpdate(
            siteWithThisTemplate._id,
            {defaultIncFilesTemplateId: null}
        )
    }

    // Отправить успешный ответ
    res.status(200).json({
        status: 'success'
    })
})
