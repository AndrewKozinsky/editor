import React from 'react';
import ReactDOM from 'react-dom';
import { store } from 'store/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './common/App/App';
ReactDOM.render(React.createElement(Provider, { store: store }, React.createElement(Router, { basename: '/editor' }, React.createElement(React.StrictMode, null, React.createElement(App, null)))), document.getElementById('root'));
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map