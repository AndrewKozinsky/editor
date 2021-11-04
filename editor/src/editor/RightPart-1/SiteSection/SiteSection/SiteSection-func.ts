import { useEffect } from 'react'
import StoreSitesTypes from 'store/site/sitesTypes'
// import { siteSectionMessages } from 'messages/siteSectionMessages'
// import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
// import { ButtonIconType } from 'common/formElements/Button/Button'
// import { OptionsType } from 'common/formElements/Select/SelectTypes'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import FCType from 'libs/FormConstructor/FCType'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'

/**
 * Хук изменяет имя сайта в поле Название при переключении сайта
 * @param {Object} formState — объект состояния формы
 */
export function useSetSiteName(formState: FCType.StateFormReturn) {
    // id текущего сайта и массив сайтов
    const { currentSiteId, sites } = useGetSitesSelectors()

    useEffect(function () {
        if (!sites.length) return

        // Найти сайт с указанным id
        let site = sites.find(site => site.id === currentSiteId)
        if (!site) return

        // Поставить название выбранного сайта в поле «Название» в форме редактирования сайта
        const valueFieldNewData = Object.assign(formState.fields['name'],{ value: [site.name]})
        formState.updateField('name', valueFieldNewData)

        // Не забудь про defaultSiteTemplateId
    }, [currentSiteId, sites])
}

/**
 * Функция запускаемая после получения ответа от сервера
 * при отправке формы создания нового сайта или изменения существующего
 * @param {Object} response — объект ответа от сервера
 */
export async function afterSubmit(response: FCType.Response) {
    // Если сайт успешно создан...
    if (response.status === 'success') {
        // Скачать новый список сайтов и поставить в Хранилище
        await store.dispatch(actions.sites.requestSites())

        // Найти в Хранилище сайт с таким же id как у только что созданного сайта
        const newSite = store.getState().sites.sites.find((site: any) => {
            // @ts-ignore
            return site.id === response.data.sites[0].id
        })
        // Выделить созданный сайт
        store.dispatch(actions.sites.setCurrentSiteId(newSite.id))
    }
}

/** Функция возвращает текст и тип значка на кнопке отправки формы */
/*export function useGetSubmitButtonText() {
    // id текущего сайта
    const { currentSiteId } = useSelector((store: AppStateType) => store.sites)
    const [submitName, setSubmitName] = useState('')
    const [submitIconType, setSubmitIconType] = useState<ButtonIconType>('btnSignAdd')

    useEffect(function () {
        // Если выделели новый сайт
        if (!currentSiteId) {
            setSubmitName(siteSectionMessages.submitBtnTextNewSite)
            // На кнопке отправки поставить значёк Плюс.
            setSubmitIconType('btnSignAdd')
        }
        // Если выделили существующий сайт.
        else {
            setSubmitName(siteSectionMessages.submitBtnTextSave)
            // На кнопке отправки поставить значёк Сохранения.
            setSubmitIconType('btnSignSave')
        }
    }, [currentSiteId])

    return { submitName, submitIconType }
}*/

/**
 * Функция возвращает булево значение нужно ли показывать кнопку удаления сайта.
 * Она видна только если выделен существующий сайт.
 */
/*export function useGetDeleteSiteVisibilityStatus() {
    // id текущего сайта
    const { currentSiteId } = useSelector((store: AppStateType) => store.sites)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(function () {
        if (!currentSiteId) setIsVisible(false)
        else setIsVisible(true)
    }, [currentSiteId])

    return isVisible
}*/

/**
 * Хук контролирует выпадающий список выбора шаблона по умолчанию для всего сайта.
 * Возвращает объект со свойствами:
 * showSelect — показывать ли выпадающий список со списком шаблонов,
 * один из которых можно указать в качестве шаблона по умолчанию для всего сайта.
 * selectOptions — массив пунктов выпадающего списка
 */
/*export function useManageTemplatesSelect(fh: FHTypes.ReturnObj) {

    // Массив шаблонов подключаемых файлов
    const templates:StoreSitesTypes.IncFilesTemplatesType  = useSelector((store: AppStateType) => {
        return store.sites.siteTemplatesSection.templates
    })

    const [isVisible, setIsVisible] = useState(false)
    const [selectOptions, setSelectOptions] = useState([])

    useEffect(function () {
        // Если есть массив шаблонов...
        if (templates && templates.length) {

            // Формирование массива пунктов выпадающего списка
            const options: OptionsType = templates.map(template => {
                return {
                    value: template.id,
                    label: template.name
                }
            })
            options.unshift({
                value: 'none',
                label: siteSectionMessages.defaultTemplateSelectNoValue
            })

            // Установка пунктов выпадающего списка
            setSelectOptions(options)
            // Сделать <select> видимым
            setIsVisible(true)
        }
        // Если нет массива шаблонов...
        else {
            // Скрыть <select>
            setIsVisible(false)

            // Очистить значение выпадающего списка в обработчике форм
            const templatesField = fh.formState.fields.defaultTemplate
            const newTemplatesField = {
                ...templatesField,
                fieldValue: ['']
            }
            fh.setFormState = makeImmutableObj(fh.formState, templatesField, newTemplatesField)
        }
    }, [templates])

    return {
        isVisible,
        selectOptions
    }
}*/
