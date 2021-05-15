import {Router} from 'express'
import * as authController from '../controllers/authController/authController'
import * as includedFilesTemplateController
    from '../controllers/includedFilesTemplateController/includedFilesTemplateController'


const router = Router()

// Маршруты для манипулирования шаблонами подключаемых файлов сайта
router.route('/')
    // Получение всех шаблонов
    .get(authController.protect, includedFilesTemplateController.getAllTemplates)
    // Создание шаблона
    .post(authController.protect, includedFilesTemplateController.createTemplate)

router.route('/:templateId')
    // Изменение данных шаблона
    .patch(authController.protect, includedFilesTemplateController.updateTemplate)
    // Удаление шаблона
    .delete(authController.protect, includedFilesTemplateController.deleteTemplate)


export default router