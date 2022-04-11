import React from 'react'
import TextInput, { TextInputPropType } from 'common/formElements/TextInput/TextInput'
import FieldGroup, {
    FieldGroupInputDataType,
    FieldGroupInputType,
    FieldGroupPropType
} from 'common/formElements/FieldGroup/FieldGroup'
import Select, { SelectPropType } from 'common/formElements/Select/Select'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import commonMsg from '../../../../../messages/commonMessages'
import makeClasses from './Meta-classes'
import { getInputView, useGetOnChangeInputHandler } from './Meta-func'
import MetaType from './MetaType'
import { OptionsType } from 'common/formElements/Select/SelectTypes'

function Meta() {
    const { meta } = useGetSitesSelectors().articleSection
    const CN = makeClasses()

    if (!meta) return null

    return (
        <div className={CN.root}>
            {meta.map((metaItemData, i) => {
                if (metaItemData.type === 'header') {
                    return <MetaHeader headerData={metaItemData} key={i} />
                }
                else if (metaItemData.type === 'input') {
                    return <MetaInput inputData={metaItemData} items={meta} key={i} />
                }
            })}
        </div>
    )
}

export default Meta


type MetaHeaderPropType = {
    headerData: MetaType.Header
}

function MetaHeader(props: MetaHeaderPropType) {
    const { headerData } = props
    const CN = makeClasses()

    return <h4 className={CN.header}>{headerData.text}</h4>
}


type MetaInputPropType = {
    inputData: MetaType.Input
    items: MetaType.Items
    inputView?: 'text' | 'radio' | 'checkbox' | 'select'
}

function MetaInput(props: MetaInputPropType) {
    const { inputData, items } = props
    const CN = makeClasses()

    const inputView = getInputView(inputData)

    return (
        <div className={CN.inputWrapper}>
            {inputView === 'text' &&
                <MetaTextInput inputData={inputData} items={items} />
            }
            {['radio', 'checkbox'].includes(inputView)  &&
                <MetaRadioCheckboxInput inputData={inputData} items={items} inputView={inputView} />
            }
            {inputView === 'select' &&
                <MetaSelectInput inputData={inputData} items={items} />
            }
        </div>
    )
}

function MetaTextInput(props: MetaInputPropType) {
    const { inputData, items } = props

    const onChangeHandler = useGetOnChangeInputHandler(items, inputData.id)

    const fieldData: TextInputPropType = {
        label: inputData.label,
        name: inputData.name,
        value: inputData.value ? inputData.value[0] : '',
        grayText: inputData.name,
        onChange: onChangeHandler
    }

    return <TextInput {...fieldData} />
}

/** Группа переключателей или флагов */
function MetaRadioCheckboxInput(props: MetaInputPropType) {
    const { inputData, items, inputView } = props

    const valuesArr: FieldGroupInputDataType[] = inputData.values.map(valueObj => {
        return {label: valueObj.label, value: valueObj.id}
    })

    // Добавление пустого пункта если это переключатели
    if (inputView === 'radio') {
        valuesArr.unshift({label: commonMsg.optionNotSelected, value: ''})
    }

    const onChangeHandler = useGetOnChangeInputHandler(items, inputData.id)

    const fieldData: FieldGroupPropType = {
        inputType: inputView as FieldGroupInputType,
        label: inputData.label,
        groupName: inputData.name,
        value: inputData.value || [''],
        grayText: inputData.name,
        inputsArr: valuesArr,
        onChange: onChangeHandler
    }

    return <FieldGroup {...fieldData} />
}


function MetaSelectInput(props: MetaInputPropType) {
    const { inputData, items } = props

    const optionsArr: OptionsType = inputData.values.map(valueObj => {
        return {label: valueObj.label, value: valueObj.id}
    })

    // Добавление пустого пункта
    optionsArr.unshift({label: commonMsg.optionNotSelected, value: ''})

    const onChangeHandler = useGetOnChangeInputHandler(items, inputData.id)

    const fieldData: SelectPropType = {
        label: inputData.label,
        name: inputData.name,
        value: inputData.value ? inputData.value[0] : '',
        options: optionsArr,
        onChange: onChangeHandler
    }

    return <Select {...fieldData} />
}