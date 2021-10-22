// import { Response, NextFunction } from 'express'
// import { catchAsync } from '../../errors/catchAsync'
// import { ExtendedRequestType } from '../../types/commonTypes'
// import SiteModel from '../../models/site'
// import SiteTemplateModel from '../../models/siteTemplate'
// import {AppError} from '../../errors/appError'



/** Get an included files template (protected route) */
/*export const getSiteSiteTemplate = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    const siteId = req.params.siteId.toString()

    // Get an included files template with passed id
    const template = await SiteTemplateModel.findOne
        ({siteId: siteId, _id: req.params.templateId})
        .select('-__v -userId')

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            template
        }
    })
})*/


/** Получение всех шаблонов определённого сайта (защищённый маршрут) */
/*export const getSiteSiteTemplates = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    const siteId = req.params.siteId.toString()

    // Получение всех шаблонов сайта с переданным id
    const templates = await SiteTemplateModel.find({siteId}).select('-__v -userId')

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            templates
        }
    })
})*/


/** Создание шаблона (защищённый маршрут) */
/*export const createSiteTemplate = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Эта проверка требуется только для TS. Сам пользователь будет потому что это защищённый маршрут.
    if (!req.user) return

    // Если не передали имя шаблона, то возвратить ошибочный ответ
    if (!req.body.name) {
        return next(
            new AppError('name', '{{siteTemplateController.createTemplateNoName}}', 400)
        )
    }

    // Создание нового шаблона
    let newTemplate = await SiteTemplateModel.create({
        name: req.body.name,
        userId: req.user.id,
        siteId: req.params.siteId.toString(),
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
})*/


/** Изменение данных шаблона (защищённый маршрут) */
/*export const updateSiteTemplate = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Найти сайт и обновить его данные
    const updatedTemplate = await SiteTemplateModel.findByIdAndUpdate(
        req.params.templateId,
        req.body,
        {new: true}
    ).select('-__v')

    // Если не найден шаблон, то возвратить ошибочный ответ
    if (!updatedTemplate) {
        return next(
            new AppError('name', '{{siteTemplateController.updateTemplateNotFound}}', 400)
        )
    }

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            template: updatedTemplate
        }
    })
})*/


/** Удаление шаблона (защищённый маршрут) */
/*
export const deleteSiteTemplate = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {
    const siteId = req.params.siteId.toString()

    // Удалить шаблон из БД
    await SiteTemplateModel.findByIdAndDelete(
        req.params.templateId
    )

    // Проверю в сайтах, не стоит ли id удаляемого шаблона как id шаблона по умолчанию.
    // Если стоит, то очищу в сайте свойство defaultSiteTemplateId
    const siteWithThisTemplate = await SiteModel.findOne({defaultSiteTemplateId: req.params.templateId})
    if (siteWithThisTemplate) {
        await SiteModel.findByIdAndUpdate(
            siteWithThisTemplate._id,
            {defaultSiteTemplateId: null}
        )
    }

    // Отправить успешный ответ
    res.status(200).json({
        status: 'success'
    })
})*/
