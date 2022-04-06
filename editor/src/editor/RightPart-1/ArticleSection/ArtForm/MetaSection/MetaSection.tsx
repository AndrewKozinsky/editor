import React from 'react'
import Select from 'common/formElements/Select/Select'
import Wrapper from 'common/Wrapper/Wrapper'
import Button from 'common/formElements/Button/Button'
import Hr from 'common/misc/Hr/Hr'
import articleSectionMsg from 'messages/articleSectionMessages'
import Meta from '../Meta/Meta'
import {
    useGetOnFormSubmit,
    useGetSelectOptions,
    useGetSelectValue,
    useGetOnChangeSelectInput,
    useUpdateMetaDependsOnTemplateId, useSetInitialMeta, useCorrectMetaData
} from './MetaSection-func'

/** Форма редактирования метаданных статьи */
function MetaSection() {

    // Хук устанавливает метаданные в статью если указан шаблона метаданных по умолчанию, но данных нет.
    // Отрабатывает 1 раз после загрузки данных
    useSetInitialMeta()

    // Хук следит когда в Хранилище загрузилась метаданные,
    // скачивает выбранный шаблон метаданных
    // и правит данные чтобы они соответствовали шаблону
    useCorrectMetaData()

    // Хук отслеживает изменение id выбранного шаблона метаданных
    // и загружает метаданные если он изменился
    useUpdateMetaDependsOnTemplateId()

    // Данные для выпадающего списка выбора шаблона метаданных
    const selectOptions = useGetSelectOptions()
    const selectValue = useGetSelectValue()
    const selectOnChangeHandler = useGetOnChangeSelectInput()

    const onFormSubmit = useGetOnFormSubmit()

    return (
        <form onSubmit={onFormSubmit}>
            <Select
                label={articleSectionMsg.selectMetaTempSelectLabel}
                name='metaTemplateId'
                options={selectOptions}
                value={selectValue}
                onChange={selectOnChangeHandler}
            />
            <Wrapper t={20} b={10}>
                <Meta />
            </Wrapper>
            <Wrapper t={20} b={10}>
                <Hr />
            </Wrapper>
            <Wrapper align='right'>
                <Button
                    type='submit'
                    text={articleSectionMsg.submitMetaFormButton}
                    icon='btnSignSave'
                />
            </Wrapper>
        </form>
    )
}

export default MetaSection
