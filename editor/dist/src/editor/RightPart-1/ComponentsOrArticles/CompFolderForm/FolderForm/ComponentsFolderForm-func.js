import { useEffect } from 'react';
import useGetSitesSelectors from 'store/site/sitesSelectors';
import filesTreePublicMethods from 'libs/DragFilesTree/publicMethods';
/**
 * Хук отслеживает выделение другой папки с компонентами и изменяет форму чтобы отражать данные выделенной папки
 * @param {Object} formState — объект состояния формы
 */
export function useGetAnotherFolderData(formState) {
    // Массив папок
    const foldersArr = useGetSitesSelectors().compFolderSection.compFolder;
    // id выделенной папки
    const { currentCompItemId } = useGetSitesSelectors().componentSection;
    useEffect(function () {
        setNewFolderName(foldersArr, currentCompItemId, formState);
    }, [foldersArr, currentCompItemId]);
}
/**
 * Функция получает название выделенной папки и ставит её в поле name у формы.
 * Поэтому при выборе какой-либо папки в форме меняется её имя.
 * @param {Array} foldersArr — массив данных по папкам и файлам.
 * @param {String} currentItemId — id выделенной папки
 * @param {Object} formState — объект состояния формы
 */
function setNewFolderName(foldersArr, currentItemId, formState) {
    if (!foldersArr || !currentItemId)
        return;
    // Найти папку с указанным id в массиве папок и файлов
    const folder = filesTreePublicMethods.getItemById(foldersArr, currentItemId);
    // Поставить новое значение поля имени папки
    const valueFieldData = Object.assign(formState.fields['name'], { value: [folder.name] });
    // Обновление поля name
    formState.updateField('name', valueFieldData);
}
//# sourceMappingURL=ComponentsFolderForm-func.js.map