import { useEffect, useState } from 'react';
import useGetArticleSelectors from 'store/article/articleSelectors';
import { store } from 'store/rootReducer';
import actions from 'store/rootAction';
/**
 * The hook sets OnMove and OnClick mouse handlers to IFrame document.
 * They save information about component/element under cursor in Store
 */
export function useSetMouseHandlersForFlashRects() {
    const { $links, history } = useGetArticleSelectors();
    // Were mouse move handlers set?
    const [mouseMoveHandlerSet, setMouseMoveHandlerSet] = useState(false);
    useEffect(function () {
        if (!$links.$document || mouseMoveHandlerSet || !history.length)
            return;
        // Set handlers mousemove and mousedown
        $links.$document.addEventListener('mousemove', hoverHandler);
        $links.$document.addEventListener('mousedown', selectHandler);
        // Set flag that handlers were set
        setMouseMoveHandlerSet(true);
    }, [$links, mouseMoveHandlerSet]);
}
function hoverHandler(e) {
    mouseHandler(e, 'hover');
}
function selectHandler(e) {
    mouseHandler(e, 'select');
}
/**
 * OnMove and OnClick mouse handler.
 * The function defines component/element under cursor and set its coordinates to Store.
 * @param {Event} event — event object
 * @param {String} actionType — mouse hovers or selects under element
 */
function mouseHandler(event, actionType) {
    const ctrlPressed = isCtrlPressed(event);
    // Element under cursor
    const $target = event.target;
    // Если нажата клавиша CTRL, то хотят поставить перемещающий прямоугольник
    if (ctrlPressed) {
        const $component = $target.closest('[data-em-d-gen-comp-id]');
        // Тип выделенного компонента: move
        let moveActionType = actionType === 'hover' ? 'moveHover' : 'moveSelect';
        if ($component) {
            const dataCompId = parseInt($component.dataset.emDGenCompId) || null;
            setFlashRectangle(moveActionType, 'component', dataCompId, null);
        }
        else {
            setFlashRectangle(moveActionType, 'component', null, null);
        }
    }
    // Если клавиша CTRL не нажата, то хотят поставить выделяющий прямоугольник
    else {
        // Получить объект с данными курсор стоит над текстовым компонентом или элементом
        let elemAndTextComp = getElementAndTextComponent($target);
        // Если курсор стоит над текстовым компонентом и нажали кнопку мыши, то убрать выделяющий прямоугольник
        if (elemAndTextComp.type === 'textComponent' && actionType === 'select') {
            // Запустить экшен ставящий id текстового компонента в Хранилище
            setTextCompId(elemAndTextComp.dCompId);
            // Скрыть выделяющий прямоугольник
            setFlashRectangle(actionType, null, null, null);
        }
        // Если курсор стоит над корневым тегом компонента не являющийся элементом
        else if (elemAndTextComp.type === 'component') {
            setFlashRectangle(actionType, elemAndTextComp.type, elemAndTextComp.dCompId, null);
        }
        // Если курсор стоит над элементом
        else if (elemAndTextComp.type === 'element' || elemAndTextComp.type === 'rootElement') {
            setFlashRectangle(actionType, elemAndTextComp.type, elemAndTextComp.dCompId, elemAndTextComp.dElemId);
        }
        else {
            // Скрыть выделяющий прямоугольник
            setFlashRectangle(actionType, null, null, null);
            // Запустить экшен обнуляющий id текстового компонента в Хранилище
            if (actionType === 'select')
                setTextCompId(null);
        }
    }
}
/**
 * Функция запускает экшен подсвечивающий элемент
 * @param {String} actionType — тип подсветки: 'hover' | 'select' | 'moveHover' | 'moveSelect'
 * @param {Boolean} tagType — тип тега над которым завис курсор: component, rootElement или element
 * @param {Number} dataCompId — id данных компонента подсвечиваемого компонента/элемента
 * @param {Number} dataElemId — id данных элемента подсвечиваемого компонента/элемента
 */
function setFlashRectangle(actionType, tagType, dataCompId, dataElemId) {
    store.dispatch(actions.article.setFlashRectangles(actionType, tagType, dataCompId, dataElemId));
}
/**
 * Функция запускает экшен ставящий id данных выделенного текстового компонента
 * @param {Number} dataCompId — id данных выделенного текстового компонента
 */
function setTextCompId(dataCompId) {
    store.dispatch(actions.article.setTextCompId(dataCompId));
}
/**
 * Функция возвращает булево значение нажата ли клавиша ctrl (Win) или Cmd (Mac).
 * @param {Object} event — объект события
 */
function isCtrlPressed(event) {
    const isMac = navigator.platform.startsWith('Mac');
    return !isMac && event.ctrlKey || isMac && event.metaKey;
}
/**
 * Функция пробегается вверх от переданного $target и находит элемент подходящий под селектор [data-em-d-text-comp-id]
 * При этом игнорируются текстовые компоненты.
 * @param {HTMLElement} $target — изначальный элемент от которого нужно искать элемент
 */
function getElementAndTextComponent($target) {
    let $currentElem = $target;
    const resultObj = {
        type: null,
        dCompId: null,
        dElemId: null
    };
    for (; $currentElem;) {
        // Завершить поиск если наткнулись на <body> или <html>
        if ($currentElem.tagName.toUpperCase() === 'BODY' ||
            $currentElem.tagName.toUpperCase() === 'HTML') {
            return resultObj;
        }
        const textDCompId = $currentElem.dataset.emDTextCompId;
        const dGenCompId = $currentElem.dataset.emDGenCompId;
        const dCompId = $currentElem.dataset.emDCompId;
        const dElemId = $currentElem.dataset.emDElemId;
        // Завершить поиск если наткнулись на текстовый компонент
        if (textDCompId) {
            resultObj.type = 'textComponent';
            resultObj.dCompId = parseInt(textDCompId);
            return resultObj;
        }
        // Если курсор стоит над корневым тегом компонента, который не является элементом
        if (dGenCompId && !dCompId) {
            resultObj.type = 'component';
            resultObj.dCompId = parseInt(dGenCompId);
            return resultObj;
        }
        // Если курсор стоит над корневым тегом компонента, который является элементом
        if (dGenCompId && dCompId) {
            resultObj.type = 'rootElement';
            resultObj.dCompId = parseInt(dCompId);
            resultObj.dElemId = parseInt(dElemId);
            return resultObj;
        }
        // Если курсор стоит не над корневым тегом компонента, который является элементом
        if (!dGenCompId && dCompId) {
            resultObj.type = 'element';
            resultObj.dCompId = parseInt(dCompId);
            resultObj.dElemId = parseInt(dElemId);
            return resultObj;
        }
        // @ts-ignore
        $currentElem = $currentElem.parentNode
            ? $currentElem.parentNode
            : null;
    }
    return resultObj;
}
//# sourceMappingURL=useSetMouseHandlersForFlashRects.js.map