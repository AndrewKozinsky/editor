import {Router} from 'express'
import * as authController from '../controllers/authController/authController'
import * as siteController from '../controllers/siteController/siteController'


const router = Router()

// Маршруты для манипулирования сайтами
router.route('/')
    // Получение всех сайтов
    .get(authController.protect, siteController.getAllSites)
    // Создание сайта
    .post(authController.protect, siteController.createSite)

router.route('/:siteId')
    // Изменение данных сайта
    .patch(authController.protect, siteController.updateSite)
    // Удаление сайта
    .delete(authController.protect, siteController.deleteSite)


export default router