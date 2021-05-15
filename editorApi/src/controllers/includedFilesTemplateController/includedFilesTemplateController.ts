import { Response, NextFunction } from 'express'
import { catchAsync } from '../../utils/errors/catchAsync'
import {CommonTypes, ExtendedRequestType } from '../../types/commonTypes'
import IncludedFilesTemplateModel from '../../models/includedFilesTemplate'
import {AppError} from '../../utils/errors/appError'


/** Получение всех шаблонов (защищённый маршрут) */
export const getAllTemplates = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    // Эта проверка требуется только для TS. Сам пользователь будет потому что это защищённый маршрут.
    if (!req.user) return

    // Получение всех шаблонов сайта
    const templates = await IncludedFilesTemplateModel.find({userId: req.user.id}).select('-__v -userId')

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
            new AppError('name', '{{includedFilesTemplateController.createTemplateNoName}}', 400)
        )
    }

    // Если не передали id сайта, к которому должен принадлежать шаблон,
    // то возвратить ошибочный ответ
    if (!req.body.siteId) {
        return next(
            new AppError('name', '{{includedFilesTemplateController.createTemplateNoSiteId}}', 400)
        )
    }

    // Создание нового шаблона
    let newTemplate = await IncludedFilesTemplateModel.create({
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
    const updatedTemplate = await IncludedFilesTemplateModel.findByIdAndUpdate(
        req.params.templateId,
        req.body,
        {new: true}
    ).select('-_v')

    // Если не найден шаблон, то возвратить ошибочный ответ
    if (!updatedTemplate) {
        return next(
            new AppError('name', '{{includedFilesTemplateController.updateTemplateNotFound}}', 400)
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
    await IncludedFilesTemplateModel.findByIdAndDelete(
        req.params.templateId
    )

    // TODO При удалении проверяй id шаблона в качестве шаблона по умолчанию в сайте, которому он принадлежит.
    // Если они идентичны, то обнуляй id шаблона по умолчанию в сайте

    // Отправить успешный ответ
    res.status(200).json({
        status: 'success'
    })
})
