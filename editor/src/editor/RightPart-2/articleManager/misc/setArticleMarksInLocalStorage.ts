import FilesTreeType from 'types/filesTree'
import {getFromLocalStorage, setInLocalStorage} from 'utils/MiscUtils'

type MarksObj = {
    // Article site id
    siteId?: string // '60ca102ef8cfcc002074b3da'
    // Article uuid
    articleId?: string // '1dc98c6c-c2fd-45bd-ad9d-25129045c818'
    // id of included files template id
    incFilesId?: string // '60cc62ab5405e00071442016'
    // open component template folder uuids
    openCompFoldersUuIds?: FilesTreeType.UuIdArr // ['1', '3']
}

/**
 * Function saves article misc data (article site id, article uuid and other data) to localStorage
 * to know what kind of article the editor has to open next time
 * @param {Object} marksObj — saved data
 */
export function supplementArtMarksInLocalStorage(marksObj: MarksObj) {
    // Current object with article data
    const currentMarkObj = getFromLocalStorage('article')
    // Updated object with article data
    const updatedMarkObj = Object.assign(currentMarkObj, marksObj)
    // Put updated data in LocalStorage
    setInLocalStorage('article', updatedMarkObj)
}