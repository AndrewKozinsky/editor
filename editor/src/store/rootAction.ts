import userActions from './user/userActions'
import settingsActions from './settings/settingsActions'
import sitesActions from './site/sitesActions'
import articleActions from './article/articleActions'
import modalActions from './modal/modalActions'
import permanentDataActions from './permanentData/permanentDataActions'

const actions = {
    user: userActions,
    settings: settingsActions,
    sites: sitesActions,
    article: articleActions,
    modal: modalActions,
    permanentData: permanentDataActions,
}

export default actions
