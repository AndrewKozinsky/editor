import getMsgProxy from './fn/msgProxy'

// Секция «Учетная запись»
const userAccountSectionMessages = {
    header: {
        eng: 'User account',
        rus: 'Учетная запись'
    },
    deleteBtn: {
        eng: 'Delete',
        rus: 'Удалить'
    },
    logOutBtn: {
        eng: 'Log Out',
        rus: 'Выйти'
    },
    confirmModalHeader: {
        eng: 'Do you want to delete your account?',
        rus: 'Удалить учётную запись?'
    },
    confirmModalText: {
        eng: 'If you delete your account, all articles created in the editor will also be deleted. Articles on your site will not be affected. Delete this account?',
        rus: 'С удалением учётной записи будут удалены и все статьи созданные в редакторе. Статьи на вашем сайте затронуты не будут. Удалить учётную запись?'
    },
    accountSuccessfullyDeleted: {
        eng: 'Account was deleted',
        rus: 'Учётная запись удалена'
    },
}

const userAccountSectionMsg = getMsgProxy<typeof userAccountSectionMessages>(userAccountSectionMessages)
export default userAccountSectionMsg