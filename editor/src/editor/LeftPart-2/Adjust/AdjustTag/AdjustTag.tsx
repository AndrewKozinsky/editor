import React from 'react'
import AdjustInputs, { TagAdjInputsType } from '../AdjustInputs/AdjustInputs'
// import useGetInputsConfig from '../commonHooks'

export default function AdjustTag() {
    // const inputsConfig = useGetInputsConfig('attrs')
    const inputsConfig: TagAdjInputsType[] = []

    return <AdjustInputs config={inputsConfig} />
}
