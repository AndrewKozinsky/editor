import React from 'react'
import AdjustInputs, { AdjInputsType } from '../AdjustInputs/AdjustInputs'
import useGetInputsConfig from '../commonHooks'

export default function AdjustTag() {
    const inputsConfig = useGetInputsConfig('tag')
    // const inputsConfig: AdjInputsType[] = []

    return <AdjustInputs config={inputsConfig} />
}
