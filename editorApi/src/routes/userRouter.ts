import {Router} from 'express'
import * as authController from '../controllers/authController/authController'


const router = Router()

// Регистрация пользователя
router.post('/signup', authController.signUp)

// Подтверждение почты пользователя
router.get('/confirmEmail/:token', authController.confirmEmail)

// Вход пользователя
router.post('/login', authController.logIn)

// Выход пользователя
router.route('/logout').get(authController.protect, authController.logOut)

// Получение данных токена
// router.post('/getTokenInfo', authController.getTokenInfo)

// Отправка письма со ссылкой на сброс пароля
router.post('/forgotPassword', authController.forgotPassword)

// Сброс пароля
// router.patch('/resetPassword/:token', authController.resetPassword)

// router.route('/myEmail')
//     .put(authController.protect, userController.changeMyEmail)

// router.route('/me')
    // Получение данных пользователя
    // .get(authController.protect, userController.getMe)
    // Обновление данных пользователя
    // .patch(authController.protect, userController.updateMe)
    // Удаление пользователя
    // .delete(authController.protect, userController.deleteMe)

// Изменение пароля
// router.route('/myPassword')
//     .patch(authController.protect, userController.updateMyPassword)


export default router