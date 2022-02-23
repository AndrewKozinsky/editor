import React from 'react'
import ModalShortContent from 'src/common/modalEntities/ModalShortContent/ModalShortContent'
import componentFormMsg from 'src/messages/componentTemplateFormMessages'
import FormConstructor from 'src/libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'src/libs/FormConstructor/state/useFormConstructorState'
import deleteComponentFormConfig from './formConfig'


/** Содержимое модального окна с вопросом удалить ли шаблон сайта и кнопками отмены и удаления */
export function DeleteComponentModalContent() {
    const formState = useFormConstructorState(deleteComponentFormConfig)

    return (
        <ModalShortContent
            header={componentFormMsg.deleteComponentConfirmationHeaderInModal}
            text={componentFormMsg.deleteComponentConfirmationTextInModal}
            bottomElems={
                [<FormConstructor config={deleteComponentFormConfig} state={formState} key={1} />]
            }
        />
    )
}
