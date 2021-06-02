import { Response, NextFunction } from 'express'
import { catchAsync } from '../../utils/errors/catchAsync'
import { ExtendedRequestType } from '../../types/commonTypes'
import {AppError} from '../../utils/errors/appError'
import ComponentsOrderModel from '../../models/componentsOrder';


/** Получение порядка расположения шаблонов компонентов определённого сайта (защищённый маршрут) */
export const getComponentsOrder = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Если не передали id сайта, то возвратить ошибочный ответ
    if (!req.params.siteId) {
        return next(
            new AppError(null, '{{componentsOrderController.getComponentsOrderNoSiteId}}', 400)
        )
    }

    // Получение порядка шаблонов компонентов сайта с переданным id
    const order = await ComponentsOrderModel
        .findOne({siteId: req.params.siteId})
        .select('-__v -_id')

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            order
        }
    })
})


/** Изменение свойства content в порядке шаблонов компонентов (защищённый маршрут)
 * В запросе должен передаваться JSON вида: {content: [{...}]}
 * */
export const updateComponentsOrder = catchAsync<void>(async (req: ExtendedRequestType, res: Response, next: NextFunction) => {

    // Повторно найти объект порядка и обновить его данные
    const updatedOrder = await ComponentsOrderModel.findOneAndUpdate(
        {siteId: req.params.siteId},
        {content: req.body.content},
        {new: true}
    ).select('-__v -_id')

    console.log(updatedOrder)

    // Если порядок не найден, то возвратить ошибочный ответ
    if (!updatedOrder) {
        return next(
            new AppError(null, '{{componentsOrderController.updateComponentsOrderOrderNotFound}}', 400)
        )
    }

    // Отправить данные пользователю
    res.status(200).json({
        status: 'success',
        data: {
            order: updatedOrder
        }
    })
})