import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import useFormHandler from 'libs/formHandler/useFormHandler'
import Wrapper from 'common/Wrapper/Wrapper'
import TextInput from 'common/formElements/TextInput/TextInput'
import Button from 'common/formElements/Button/Button'
import Form from 'common/formElements/Form/Form'
import Hr from 'common/misc/Hr/Hr'
import getFormConfig from './formResources'
import messages from '../messages'
import {useGetSiteName} from './SiteSection-func'


type SiteSectionPropType = {
    display?: boolean
}

export default function SiteSection(props: SiteSectionPropType) {

    const {
        display // Показывать ли компонент
    } = props

    const dispatch = useDispatch()

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    const siteName = useGetSiteName()

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang, siteName), 'site')

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
                <Wrapper t={20} align={'right'}>
                    <Hr />
                </Wrapper>
                <Wrapper t={10} align={'right'}>
                    <Button
                        type='submit'
                        text={messages.SiteSection.submitBtnText[lang]}
                        name='submit'
                        disabled={fh.fields.submit.data.disabled}
                        loading={fh.fields.submit.data.loading}
                    />
                </Wrapper>
            </Form>
        </div>
    )
}
