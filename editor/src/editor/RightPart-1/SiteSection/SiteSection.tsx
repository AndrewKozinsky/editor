import React from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import useFormHandler from 'libs/formHandler/useFormHandler'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Button from 'common/formElements/Button/Button'
import Form from 'common/formElements/Form/Form'
import Select from 'common/formElements/Select/Select'
import Hr from 'common/misc/Hr/Hr'
import getFormConfig from './formResources'
import useGetDeleteSite from './deleteSite'
import messages from '../messages'
import {
    useGetAnotherSite,
    useGetDeleteSiteVisibilityStatus,
    useGetSubmitButtonText,
    useManageTemplatesSelect
} from './SiteSection-func'
import './SiteSection.scss'


type SiteSectionPropType = {
    display?: boolean
}

export default function SiteSection(props: SiteSectionPropType) {

    const {
        display // Показывать ли компонент
    } = props

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang), 'site')
    // Изменение данных формы при выделении другого сайта
    useGetAnotherSite(fh.formState, fh.setFormState)

    // Можно ли показывать выпадающий список с выбором шаблона подключаемых сайтов по умолчанию
    const {isVisible, selectOptions} = useManageTemplatesSelect(fh)

    // Текст на кнопке отправки
    const submitButtonText = useGetSubmitButtonText(lang)

    const CN = 'site-section'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <Form name='site' formHandlers={fh.formHandlers}>
                <Wrapper>
                    <TextInput
                        label={ messages.SiteSection.siteNameInput[lang] }
                        name='name'
                        value={fh.fields.name.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        placeholder={messages.SiteSection.siteNamePlaceholder[lang]}
                        error={fh.fields.name.data.error}
                        disabled={fh.fields.name.data.disabled}
                    />
                </Wrapper>
                {isVisible && <Wrapper t={15}>
                    <Select
                        label={ messages.SiteSection.defaultTemplateInput[lang] }
                        name='defaultIncFilesTemplateId'
                        value={fh.fields.defaultIncFilesTemplateId.value[0]}
                        onChange={fh.onChangeFieldHandler}
                        options={selectOptions}
                    />
                </Wrapper>}
                <Wrapper t={20}>
                    <Hr />
                </Wrapper>
                <Wrapper t={10} align={'right'} gap={10}>
                    <Button
                        type='submit'
                        text={submitButtonText}
                        icon={fh.fields.submit.data.icon}
                        name='submit'
                        disabled={fh.fields.submit.data.disabled}
                        loading={fh.fields.submit.data.loading}
                    />
                    <DeleteSiteButton />
                </Wrapper>
            </Form>
        </div>
    )
}

/** Кнопка удаления сайта */
function DeleteSiteButton() {
    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления сайта
    const openDeleteSiteConfirmation = useGetDeleteSite()

    // Нужно ли показывать кнопку удаления сайта
    const isDeleteSiteButtonVisible = useGetDeleteSiteVisibilityStatus()
    if (!isDeleteSiteButtonVisible) return null

    return (
        <Button
            type='button'
            text={messages.SiteSection.deleteSiteBtnText[lang]}
            icon='btnSignTrash'
            onClick={openDeleteSiteConfirmation}
            // loading={fh.fields.submit.data.loading}
        />
    )
}
