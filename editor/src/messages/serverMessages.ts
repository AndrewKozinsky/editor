import getMsgProxy from './fn/msgProxy'

// Сообщения не привязанные к конкретному месту
const serverMessages = {
    // NEXT TIME USE COMMON VALUES! FOR EXAMPLE: EMAILS, PASSWORD AND SO ON.

    authGuard_userIsNotAuthorized: {
        eng: 'This request requires authorization.',
        rus: 'Для этого запроса требуется авторизация.'
    },

    user_getTokenData_tokenIsNotPassed: {
        eng: 'Token was not passed or it is wrong.',
        rus: 'Токен не был передан в запросе.'
    },
    user_createUser_alreadyRegistered: {
        eng: 'The user with this email is signed up already.',
        rus: 'Пользователь с такой почтой уже зарегистрирован.'
    },
    user_login_userDoesNotExist: {
        eng: 'User is not exist or password is wrong.',
        rus: 'Пользователь не зарегистрирован или передан неправильный пароль.'
    },
    user_login_userDoesNotConfirmEmail: {
        eng: 'You must confirm your email. A confirmation link was sent to your email when you registered.',
        rus: 'Вы должны подтвердить свою почту. Ссылка на подтверждение была отправлена на почту при регистрации.'
    },
    user_CreateUserDto_emailTooLong: {
        eng: 'The string must not be longer than 100 characters.',
        rus: 'Строка не должна быть длиннее 100 символов.'
    },
    user_CreateUserDto_itIsNotEmail: {
        eng: 'It is not look like an email.',
        rus: 'Это не похоже на почту.'
    },
    user_CreateUserDto_EmptyEmail: {
        eng: 'You must specify the email.',
        rus: 'Почта должна быть указана.'
    },
    user_CreateUserDto_passwordIsOutOfRange: {
        eng: 'Password must be 5 to 20 characters long.',
        rus: 'Пароль должен быть длиной от 5 до 20 символов.'
    },
    user_CreateUserDto_passwordIsEmpty: {
        eng: 'You must specify the password.',
        rus: 'Пароль должен быть указан.'
    },

    user_LoginDto_emailTooLong: {
        eng: 'The string must not be longer than 100 characters.',
        rus: 'Строка не должна быть длиннее 100 символов.'
    },
    user_LoginDto_itIsNotEmail: {
        eng: 'It is not look like an email.',
        rus: 'Это не похоже на почту.'
    },
    user_LoginDto_emailIsEmpty: {
        eng: 'You must specify the email.',
        rus: 'Почта должна быть указана.'
    },
    user_LoginDto_passwordIsOutOfRange: {
        eng: 'Password must be 5 to 20 characters long.',
        rus: 'Пароль должен быть длиной от 5 до 20 символов.'
    },
    user_LoginDto_passwordIsEmpty: {
        eng: 'You must specify the password.',
        rus: 'Пароль должен быть указан.'
    },

    user_sendConfirmLetter_userIsNotExist: {
        eng: 'User with such mail was not found.',
        rus: 'Пользователь с такой почтой не найден.'
    },
    user_sendConfirmLetter_emailIsConfirmed: {
        eng: 'User has already confirmed mail.',
        rus: 'Пользователь уже подтвердил почту.'
    },

    user_SendConfirmLetterDto_emailTooLong: {
        eng: 'The string must not be longer than 100 characters.',
        rus: 'Строка не должна быть длиннее 100 символов.'
    },
    user_SendConfirmLetterDto_itIsNotEmail: {
        eng: 'It is not look like an email.',
        rus: 'Это не похоже на почту.'
    },
    user_SendConfirmLetterDto_emailIsEmpty: {
        eng: 'You must specify the email.',
        rus: 'Почта должна быть указана.'
    },

    user_confirmEmail_userIsNotFound: {
        eng: 'User not found. The email is either already confirmed or has not yet been registered.',
        rus: 'Пользователь не найден. Почта или уже подтверждена или еще не была зарегистрирована.'
    },

    user_ResetPasswordDto_emailTooLong: {
        eng: 'The string must not be longer than 100 characters.',
        rus: 'Строка не должна быть длиннее 100 символов.'
    },
    user_ResetPasswordDto_itIsNotEmail: {
        eng: 'It is not look like an email.',
        rus: 'Это не похоже на почту.'
    },
    user_ResetPasswordDto_emailIsEmpty: {
        eng: 'You must specify the email.',
        rus: 'Почта должна быть указана.'
    },

    user_resetPassword_userIsNotFound: {
        eng: 'There is no user with this email address.',
        rus: 'Не найдено пользователя с такой почтой.'
    },
    user_resetPassword_failedToSendEmail: {
        eng: 'There was an error sending the email. Try again later.',
        rus: 'Не удалось отправить письмо. Попробуйте позже.'
    },

    user_ChangeResetPasswordDto_passwordIsOutOfRange: {
        eng: 'Password must be 5 to 20 characters long.',
        rus: 'Пароль должен быть длиной от 5 до 20 символов.'
    },
    user_ChangeResetPasswordDto_passwordIsEmpty: {
        eng: 'You must specify the password.',
        rus: 'Пароль должен быть указан.'
    },

    user_changeResetPassword_userIsNotFound: {
        eng: 'User not found. Maybe the password reset token is wrong or the password has not been reset.',
        rus: 'Пользователь не найден. Возможно токен сброса пароля неправильный или пароль не сбрасывали.'
    },

    user_ChangeEmailDto_emailTooLong: {
        eng: 'The string must not be longer than 100 characters.',
        rus: 'Строка не должна быть длиннее 100 символов.'
    },
    user_ChangeEmailDto_itIsNotEmail: {
        eng: 'It is not look like an email.',
        rus: 'Это не похоже на почту.'
    },
    user_ChangeEmailDto_EmptyEmail: {
        eng: 'You must specify the email.',
        rus: 'Почта должна быть указана.'
    },

    user_changeEmail_NoEmail: {
        eng: 'The new mail must be specified.',
        rus: 'Должна быть указана новая почта.'
    },
    user_changeEmail_NewEmailISEqualToCurrent: {
        eng: 'Existing email was passed. Write a new one to change existing one.',
        rus: 'Передана существующая почта. Передайте другую чтобы её изменить.'
    },
    user_changeEmail_NewEmailISUsedByAnotherUser: {
        eng: 'The email is used by another user.',
        rus: 'Почта занята другим пользователем.'
    },

    user_ChangePasswordDto_passwordIsOutOfRange: {
        eng: 'Password must be 5 to 20 characters long.',
        rus: 'Пароль должен быть длиной от 5 до 20 символов.'
    },
    user_ChangePasswordDto_currentPasswordIsEmpty: {
        eng: 'You must specify the current password.',
        rus: 'Должен быть указан текущий пароль.'
    },
    user_ChangePasswordDto_newPasswordIsEmpty: {
        eng: 'You must specify the new password.',
        rus: 'Должен быть указан новый пароль.'
    },
    user_changePassword_PasswordsIsNotMatch: {
        eng: 'The current user password does not match the one entered.',
        rus: 'Текущий пароль пользователя не совпадает с введённым.'
    },

    site_CreateSiteDto_EmptyName: {
        eng: 'You must specify the site name.',
        rus: 'Название сайта должно быть указано.'
    },
    site_CreateSiteDto_contentIsNotAString: {
        eng: 'The content field must be a string.',
        rus: 'Поле content должно быть строкой.'
    },
    site_CreateSiteDto_nameTooLong: {
        eng: 'The site name must not be longer than 255 characters.',
        rus: 'Название сайта не должно быть длиннее 255 символов.'
    },
    site_CreateSiteDto_defaultSiteTemplateIdIsNotANumber: {
        eng: 'The defaultSiteTemplateId field must be a number.',
        rus: 'Поле defaultSiteTemplateId должно быть числом.'
    },
    site_CreateSiteDto_EmptyUserId: {
        eng: 'You must specify the user\'s id who created this site.',
        rus: 'Укажите пользователя создавшего сайт.'
    },
    site_UpdateSiteDto_nameIsNotAString: {
        eng: 'The name field must be a string.',
        rus: 'Поле name должно быть строкой.'
    },

    site_UpdateSiteDto_EmptyName: {
        eng: 'You must specify the site name.',
        rus: 'Название сайта должно быть указано.'
    },
    site_UpdateSiteDto_nameTooLong: {
        eng: 'The site name must not be longer than 255 characters.',
        rus: 'Название сайта не должно быть длиннее 255 символов.'
    },
    site_UpdateSiteDto_EmptyUserId: {
        eng: 'You must specify the user\'s id who created this site.',
        rus: 'Укажите пользователя создавшего сайт.'
    },

    site_DeleteSiteDto_SiteIsNotExists: {
        eng: 'This site does not exist',
        rus: 'Указанный сайт не существует.'
    },
    site_DeleteSiteDto_CurrentUserIsNotAuthor: {
        eng: 'The current user did not create the deleted site.',
        rus: 'Текущий пользователь не создавал удаляемый сайт.'
    },

    siteTemplate_CreateSiteTemplateDto_EmptySiteId: {
        eng: 'The id of the site to which the template belongs must be specified.',
        rus: 'Должен быть указан id сайта которому принадлежит шаблон.'
    },
    siteTemplate_CreateSiteTemplateDto_EmptyContent: {
        eng: 'You must specify the site template.',
        rus: 'Должен быть указан код шаблона сайта.'
    },
    siteTemplate_CreateSiteTemplateDto_contentIsNotAString: {
        eng: 'The content field must be a string.',
        rus: 'Поле content должно быть строкой.'
    },
    siteTemplate_UpdateSiteTemplateDto_EmptyContent: {
        eng: 'You must specify the site template.',
        rus: 'Должен быть указан код шаблона сайта.'
    },
    siteTemplate_UpdateSiteTemplateDto_contentIsNotAStringEmptyContent: {
        eng: 'The content field must be a string.',
        rus: 'Поле content должно быть строкой.'
    },
    siteTemplate_CreateSiteTemplate_SiteIsNotExist: {
        eng: 'This site does not exist',
        rus: 'Указанный сайт не существует.'
    },
    siteTemplate_UpdateSiteTemplate_SiteTemplateIsNotExist: {
        eng: 'The transferred website template does not exist.',
        rus: 'Переданный шаблон сайта не существует.'
    },
    siteTemplate_DeleteSiteTemplate_SiteTemplateIsNotExists: {
        eng: 'This site does not exist',
        rus: 'Указанный сайт не существует.'
    },
    siteTemplate_DeleteSiteTemplate_CurrentUserIsNotAuthor: {
        eng: 'The current user did not create the deleted site template.',
        rus: 'Текущий пользователь не создавал удаляемый шаблон сайта.'
    },

    metaTemplate_CreateMetaTemplateDto_EmptySiteId: {
        eng: 'The id of the site to which the metadata template belongs must be specified.',
        rus: 'Должен быть указан id сайта которому принадлежит шаблон метаданных.'
    },
    metaTemplate_CreateMetaTemplateDto_EmptyContent: {
        eng: 'You must specify the metadata template.',
        rus: 'Должен быть указан код шаблона метаданных.'
    },
    metaTemplate_CreateMetaTemplateDto_contentIsNotAString: {
        eng: 'The content field must be a string.',
        rus: 'Поле content должно быть строкой.'
    },
    metaTemplate_UpdateMetaTemplateDto_EmptyContent: {
        eng: 'You must specify the metadata template.',
        rus: 'Должен быть указан код шаблона метаданных.'
    },
    metaTemplate_UpdateMetaTemplateDto_contentIsNotAStringEmptyContent: {
        eng: 'The content field must be a string.',
        rus: 'Поле content должно быть строкой.'
    },
    metaTemplate_CreateMetaTemplate_SiteIsNotExist: {
        eng: 'This site does not exist',
        rus: 'Указанный сайт не существует.'
    },
    metaTemplate_UpdateMetaTemplate_MetaTemplateIsNotExist: {
        eng: 'The transferred metadata template does not exist.',
        rus: 'Переданный шаблон метаданных не существует.'
    },
    metaTemplate_DeleteMetaTemplate_SiteIsNotExists: {
        eng: 'This site does not exist',
        rus: 'Указанный сайт не существует.'
    },
    metaTemplate_DeleteMetaTemplate_CurrentUserIsNotAuthor: {
        eng: 'The current user did not create the deleted metadata template.',
        rus: 'Текущий пользователь не создавал удаляемый шаблон метаданных.'
    },

    component_CreateComponentDto_EmptySiteId: {
        eng: 'The id of the site to which the component belongs must be specified.',
        rus: 'Должен быть указан id сайта которому принадлежит компонент.'
    },
    component_CreateComponentDto_EmptyContent: {
        eng: 'You must specify the component code.',
        rus: 'Должен быть указан код компонента.'
    },
    component_CreateComponent_SiteIsNotExist: {
        eng: 'The site in question does not exist.',
        rus: 'Указанного сайта не существует.'
    },
    component_CreateComponent_SiteTemplateIsNotExist: {
        eng: 'The specified website template does not exist.',
        rus: 'Указанный шаблон сайта не существует.'
    },

    component_UpdateComponentDto_EmptyContent: {
        eng: 'You must specify the component code.',
        rus: 'Должен быть указан код компонента.'
    },
    component_UpdateComponentDto_contentIsNotAString: {
        eng: 'The content field must be a string.',
        rus: 'Поле content должно быть строкой.'
    },
    component_UpdateComponent_ComponentIsNotExist: {
        eng: 'The transferred component does not exist.',
        rus: 'Переданный компонент сайта не существует.'
    },

    component_DeleteComponent_ComponentIsNotExist: {
        eng: 'The specified component does not exist.',
        rus: 'Указанный компонент не существует.'
    },
    component_DeleteComponent_CurrentUserIsNotAuthor: {
        eng: 'The current user did not create a component.',
        rus: 'Текущий пользователь не создавал компонент.'
    },

    compFolder_CreateCompFolderDto_EmptySiteId: {
        eng: 'The id of the site to which the components folder belongs must be specified.',
        rus: 'Должен быть указан id сайта которому принадлежит папка с компонентами.'
    },
    compFolder_CreateCompFolderDto_siteIdIsNotANumber: {
        eng: 'The site id must be a number.',
        rus: 'id сайта должен быть числом.'
    },
    compFolder_CreateCompFolderDto_contentIsNotAString: {
        eng: 'The content field must be a string.',
        rus: 'Поле content должно быть строкой.'
    },
    compFolder_UpdateCompFolderDto_EmptyContent: {
        eng: 'The code of the folder with the components must be specified.',
        rus: 'Должен быть указан код папки с компонентами.'
    },
    compFolder_UpdateCompFolderDto_contentIsNotAString: {
        eng: 'The content field must be a string.',
        rus: 'Поле content должно быть строкой.'
    },
    compFolder_UpdateCompFolder_CompFolderIsNotExist: {
        eng: 'The specified folder with components does not exist.',
        rus: 'Указанная папка с компонентами не существует.'
    },
    compFolder_DeleteCompFolder_CompFolderIsNotExist: {
        eng: 'The specified folder with components does not exist.',
        rus: 'Указанная папка с компонентами не существует.'
    },
    compFolder_DeleteCompFolder_CurrentUserIsNotAuthor: {
        eng: 'The current user did not create the deleted site template.',
        rus: 'Текущий пользователь не создавал удаляемый шаблон сайта.'
    },

    artFolder_CreateArtFolderDto_EmptySiteId: {
        eng: 'The id of the site to which the articles folder belongs must be specified.',
        rus: 'Должен быть указан id сайта которому принадлежит папка со статьями.'
    },
    artFolder_CreateArtFolderDto_siteIdIsNotANumber: {
        eng: 'The site id must be a number.',
        rus: 'id сайта должен быть числом.'
    },
    artFolder_CreateArtFolderDto_contentIsNotAString: {
        eng: 'The content field must be a string.',
        rus: 'Поле content должно быть строкой.'
    },
    artFolder_UpdateArtFolderDto_EmptyContent: {
        eng: 'The code of the folder with the articles must be specified.',
        rus: 'Должен быть указан код папки со статьями.'
    },
    artFolder_UpdateArtFolderDto_contentIsNotAString: {
        eng: 'The content field must be a string.',
        rus: 'Поле content должно быть строкой.'
    },
    artFolder_UpdateArtFolder_ArtFolderIsNotExist: {
        eng: 'The specified folder with articles does not exist.',
        rus: 'Указанная папка со статьями не существует.'
    },
    artFolder_DeleteArtFolder_ArtFolderIsNotExist: {
        eng: 'The specified folder with articles does not exist.',
        rus: 'Указанная папка со статьями не существует.'
    },
    artFolder_DeleteArtFolder_CurrentUserIsNotAuthor: {
        eng: 'The current user did not create the articles folder to be deleted.',
        rus: 'Текущий пользователь не создавал удаляемую папку со статьями.'
    },

    article_CreateArticleDto_nameIsEmpty: {
        eng: 'The name of the site should not be empty.',
        rus: 'Название сайта не должно быть пустым.'
    },
    article_CreateArticleDto_nameTooLong: {
        eng: 'The site name should not be longer than 255 characters.',
        rus: 'Название сайта не должно быть длиннее 255 символов.'
    },
    article_CreateArticleDto_contentIsNotAString: {
        eng: 'The content field must be a string.',
        rus: 'Поле content должно быть строкой.'
    },
    article_CreateArticleDto_siteTemplateIdIsNotANumber: {
        eng: 'The id of the website template must be a number.',
        rus: 'id шаблона сайта должно быть числом.'
    },
    article_CreateArticleDto_EmptySiteId: {
        eng: 'The id of the site to which the article belongs must be specified.',
        rus: 'Должен быть указан id сайта которому принадлежит статья.'
    },
    article_UpdateArticleDto_nameIsNotAString: {
        eng: 'The name field must be a string.',
        rus: 'Поле name должно быть строкой.'
    },
    article_UpdateArticleDto_contentIsNotAString: {
        eng: 'The content field must be a string.',
        rus: 'Поле content должно быть строкой.'
    },
    article_UpdateArticle_ArticleIsNotExist: {
        eng: 'This article does not exist.',
        rus: 'Указанной статьи не существует.'
    },
    article_UpdateArticleDto_siteTemplateIdIsNotANumber: {
        eng: 'The siteTemplateId field must be a number.',
        rus: 'Поле siteTemplateId должно быть числом.'
    },

    article_DeleteArticle_ArticleIsNotExist: {
        eng: 'This article does not exist.',
        rus: 'Указанной статьи не существует.'
    },
    article_DeleteArticle_CurrentUserIsNotAuthor: {
        eng: 'The current user did not create the article to be deleted.',
        rus: 'Текущий пользователь не создавал удаляемую статью.'
    },
}

const serverMsg = getMsgProxy<typeof serverMessages>(serverMessages)
export default serverMsg