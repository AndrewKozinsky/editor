import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'store/rootAction';
import useGetSitesSelectors from 'store/site/sitesSelectors';
/** Хук отслеживает выбор другого компонента и скачивает данные по нему с сервера и ставит их в Хранилище */
export function useGetComDataFromServerAndSetInStore() {
    const dispatch = useDispatch();
    const { currentCompItemId } = useGetSitesSelectors().componentSection;
    // Скачать данные при выделении другого компонента
    useEffect(function () {
        dispatch(actions.sites.requestComponentTemplate());
    }, [currentCompItemId]);
}
/**
 * Хук изменяет значения полей формы компонента после скачивания других данных компонента
 * @param {Object} formState — объект состояния формы
 */
export function useSetAnotherFormData(formState) {
    const { currentCompCode } = useGetSitesSelectors().componentSection;
    useEffect(function () {
        const valueFieldNewData = Object.assign(formState.fields['content'], { value: [currentCompCode] });
        formState.updateField('content', valueFieldNewData);
    }, [currentCompCode]);
}
//# sourceMappingURL=ComponentForm-func.js.map
//# sourceMappingURL=ComponentForm-func.js.map
//# sourceMappingURL=ComponentForm-func.js.map