import React from 'react'
import TextInput, { TextInputPropType } from 'common/formElements/TextInput/TextInput'
import FieldGroup, { FieldGroupPropType } from '../../../common/formElements/FieldGroup/FieldGroup'
import Select, { SelectPropType } from '../../../common/formElements/Select/Select'
import makeClasses from './Adjust-classes'
import { getInputsConfigExample, useIsVisible } from './Adjust-func'
import AdjustInputs, { AdjTextInputsType } from './AdjustInputs'
import useGetInputsConfig from './useGetInputsConfig'

export default function Adjust() {

    const CN = makeClasses()
    const inputsConfig = useGetInputsConfig()

    if (!useIsVisible()) return null

    return (
        <div className={CN.root}>
            <AdjustInputs config={inputsConfig} />
        </div>
    )
}



