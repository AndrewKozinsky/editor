import React from 'react'
import makeClasses from './Adjust-classes'
import { getInputsConfigExample, useIsVisible } from './Adjust-func'
import AdjustInputs from './AdjustInputs'
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



