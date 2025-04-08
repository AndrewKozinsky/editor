import React from 'react'
import AdjustInputs from '../AdjustInputs/AdjustInputs'
import useGetInputsConfig from '../commonHooks'

export default function AdjustTag() {
    const inputsConfig = useGetInputsConfig('tag')

    return <AdjustInputs config={inputsConfig} />
}
