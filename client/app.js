import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import '@/styles/app.scss';
import configureStore from './store/index';
import RouterIndex from './router/index.js'; //引入路由管理js

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterIndex />
            </PersistGate>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);

// 模块热替换的 API
// eslint-disable-next-line no-undef
if (module.hot) {
    // eslint-disable-next-line no-undef
    module.hot.accept();
}
