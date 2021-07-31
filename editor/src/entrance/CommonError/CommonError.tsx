import React from 'react'
import Wrapper from 'src/common/Wrapper/Wrapper'
import Notice from 'src/common/textBlocks/Notice/Notice'


type CommonErrorPropType = {
    error?: null | string // Текст ошибки
}

/** Компонент общей ошибки формы входа пользователя */
export default function CommonError(props: CommonErrorPropType) {
    const { error } = props

    if (!error) return null

    return (
        <Wrapper t={20}>
            <Notice icon='error' bg>
                {error}
            </Notice>
        </Wrapper>
    )
}
