import React from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import Wrapper from 'common/Wrapper/Wrapper'
import Button from 'common/formElements/Button/Button'
import TextInput from 'common/formElements/TextInput/TextInput'
import Hr from 'common/misc/Hr/Hr'
import useFormHandler from 'libs/formHandler/useFormHandler'
import getFormConfig from './formResources'
import messages from '../../messages'
import Form from 'common/formElements/Form/Form'
import Select from 'common/formElements/Select/Select';
import { useManageTemplatesSelect } from './ArticleForm-func'
import { useGetAnotherArticle } from './ArticleForm-func'
import { ModalContent } from './deleteComponent'
import useGetShowModal from 'utils/hooksUtils'

export default function ArticleForm() {

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // FormHandler
    const fh = useFormHandler(getFormConfig(lang), 'article')

    // Изменение данных формы при выделении другой статьи
    useGetAnotherArticle(fh.formState, fh.setFormState)

    // Можно ли показывать выпадающий список с выбором шаблона подключаемых сайтов по умолчанию
    const {isTemplatesSelectVisible, selectOptions} = useManageTemplatesSelect(fh)

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления шаблона
    const openDeleteTemplateConfirmation = useGetShowModal(<ModalContent />)

    return (
        <Form name='article' formHandlers={fh.formHandlers}>
            <Wrapper>
                <TextInput
                    label={messages.ArticleForm.articleNameInput[lang]}
                    name='name'
                    value={fh.fields.name.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    error={fh.fields.name.data.error}
                    disabled={fh.fields.name.data.disabled}
                />
            </Wrapper>
            {isTemplatesSelectVisible && <Wrapper t={15}>
                <Select
                    label={ messages.ArticleForm.defaultTemplateInput[lang] }
                    name='defaultIncFilesTemplateId'
                    value={fh.fields.defaultIncFilesTemplateId.value[0]}
                    onChange={fh.onChangeFieldHandler}
                    options={selectOptions}
                />
            </Wrapper>}
            <Wrapper t={15}>
                <Hr />
            </Wrapper>
            <Wrapper t={10} align={'right'} gap={10}>
                <Button
                    type='submit'
                    text={messages.ArticleForm.submitBtnText[lang]}
                    icon='btnSignSave'
                    name='submit'
                    disabled={fh.fields.submit.data.disabled}
                    loading={fh.fields.submit.data.loading}
                />
                <Button
                    type='button'
                    text={messages.ArticleForm.deleteArticleBtnText[lang]}
                    icon='btnSignTrash'
                    onClick={openDeleteTemplateConfirmation}
                />
            </Wrapper>
        </Form>
    )
}
