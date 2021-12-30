import React from 'react';
import useMakeClasses from './EditorMain-classes';
import { useGetPageVisibility } from './EditorMain-func';
import EditorPartProvider from 'editor/special/EditorPartProvider/EditorPartProvider';
import SectionsTabs from 'editor/special/SectionsTabs/SectionsTabs';
import Modal from 'common/modalEntities/Modal/Modal';
/** Главная страница редактора. */
export default function EditorMain() {
    const CN = useMakeClasses();
    // Видим ли редактор
    const isVisible = useGetPageVisibility();
    // Ничего не отрисовывать если редактор не должен быть видим.
    if (!isVisible)
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: CN.root },
            React.createElement("div", { className: CN.leftPart },
                React.createElement(SectionsTabs, null),
                React.createElement(EditorPartProvider, { position: 'left' })),
            React.createElement("div", { className: CN.rightPart },
                React.createElement(EditorPartProvider, { position: 'right' }))),
        React.createElement(Modal, null)));
}
//# sourceMappingURL=EditorMain.js.map