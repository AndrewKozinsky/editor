import {Router} from 'express'
import * as authController from '../controllers/authController/authController'
import * as incFilesTemplateController
    from '../controllers/incFilesTemplateController/incFilesTemplateController'


const router = Router()

// Маршруты для манипулирования шаблонами подключаемых файлов сайта
router.route('/')
    // Получение всех шаблонов
    .get(authController.protect, incFilesTemplateController.getSiteTemplates)
    // Создание шаблона
    .post(authController.protect, incFilesTemplateController.createTemplate)

router.route('/:templateId')
    // Изменение данных шаблона
    .patch(authController.protect, incFilesTemplateController.updateTemplate)
    // Удаление шаблона
    .delete(authController.protect, incFilesTemplateController.deleteTemplate)


export default router