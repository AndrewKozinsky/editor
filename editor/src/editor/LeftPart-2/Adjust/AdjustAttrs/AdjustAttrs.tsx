import React from 'react'
import AdjustInputs, { AdjInputsType } from '../AdjustInputs/AdjustInputs'
import useGetInputsConfig from '../commonHooks'
import makeClasses from './AdjustAttrs-classes'

export default function AdjustAttrs() {
    const CN = makeClasses()

    const inputsConfig = useGetInputsConfig('attrs')
    // Потом удали эту строку
    // const inputsConfig: AdjInputsType[] = []

    return (
        <div className={CN.root}>
            <AdjustInputs config={inputsConfig} />
        </div>
    )
}
