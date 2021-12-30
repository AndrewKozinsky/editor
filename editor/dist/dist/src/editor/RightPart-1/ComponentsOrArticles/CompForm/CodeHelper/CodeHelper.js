import React, { useEffect, useState } from 'react';
import Wrapper from 'common/Wrapper/Wrapper';
import useGetMessages from 'messages/fn/useGetMessages';
import { componentFormMessages } from 'messages/componentTemplateFormMessages';
import CodeCheckInfo from 'editor/special/CodeCheckInfo/CodeCheckInfo';
import checkComponentCode, { componentCodeExample } from './checkComponentCode';
// НАДО БЫ СДЕЛАТЬ ИЗ ВСЕХ КОМПОНЕНТОВ CodeHelper ОДИН УНИВЕРСАЛЬНЫЙ КОМПОНЕНТ. ЭТО БУДЕТ НЕТРУДНО.
export default function CodeHelper(props) {
    const { code } = props;
    const componentFormMsg = useGetMessages(componentFormMessages);
    const [checkStatus, setCheckStatus] = useState('error');
    const [header, setHeader] = useState();
    const [errors, setErrors] = useState([]);
    useEffect(function () {
        const errorsArr = checkComponentCode(code);
        setErrors(errorsArr);
        if (errorsArr.length) {
            setCheckStatus('error');
            setHeader(componentFormMsg.checkCodeErrorHeader.toString());
        }
        else {
            setCheckStatus('success');
            setHeader(componentFormMsg.checkCodeSuccessHeader.toString());
        }
    }, [code]);
    return (React.createElement(React.Fragment, null, React.createElement(Wrapper, { t: 20 }, React.createElement(CodeCheckInfo, { type: 'codeCheck', checkStatus: checkStatus, header: header, items: errors })), React.createElement(Wrapper, { t: 10 }, React.createElement(CodeCheckInfo, { type: 'codeExample', header: '\u041F\u0440\u0438\u043C\u0435\u0440 \u0448\u0430\u0431\u043B\u043E\u043D\u0430', code: componentCodeExample }))));
}
//# sourceMappingURL=CodeHelper.js.map
//# sourceMappingURL=CodeHelper.js.map