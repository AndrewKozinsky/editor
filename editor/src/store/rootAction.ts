import modalActions from './modal/modalActions'
import settingsActions from './settings/settingsActions'
import sitesActions from './site/sitesActions'
import userActions from './user/userActions'

const actions = {
    user: userActions,
    sites: sitesActions,
    settings: settingsActions,
    modal: modalActions,
}

export default actions
