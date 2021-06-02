import {Router} from 'express'
import * as authController from '../controllers/authController/authController'
import * as componentsOrderController
    from '../controllers/componentsOrderController/componentsOrderController'


const router = Router()

router.route('/:siteId')
    // Получение порядка расположения шаблонов компонентов определённого сайта
    .get(authController.protect, componentsOrderController.getComponentsOrder)
    // Изменение порядка расположения шаблонов компонентов определённого сайта
    .patch(authController.protect, componentsOrderController.updateComponentsOrder)


export default router