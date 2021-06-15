import {getMessagesObject} from 'messages/fn/getMessagesObject'

// Секция «Учетная запись»
const obj = {
    header: {
        eng: 'User account',
        rus: 'Учетная запись'
    },
    cancelBtn: {
        eng: 'Cancel',
        rus: 'Отменить'
    },
    deleteBtn: {
        eng: 'Delete',
        rus: 'Удалить'
    },
    logOutBtn: {
        eng: 'Log Out',
        rus: 'Выйти'
    },
    confirmModalText: {
        eng: 'If you delete your account, all articles created in the editor will also be deleted. Articles on your site will not be affected. Delete this account?',
        rus: 'С удалением учётной записи будут удалены и все статьи созданные в редакторе. Статьи на вашем сайте затронуты не будут. Удалить учётную запись?'
    },
}

export const userAccountSectionMessages = getMessagesObject(obj)


