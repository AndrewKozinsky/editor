import React from 'react'
import AdjustInputs from '../AdjustInputs/AdjustInputs'
import useGetInputsConfig from '../commonHooks'
import makeClasses from './AdjustAttrs-classes'


export default function AdjustAttrs() {
    const CN = makeClasses()

    const inputsConfig = useGetInputsConfig('attrs')

    return (
        <div className={CN.root}>
            <AdjustInputs config={inputsConfig} />
        </div>
    )
}
