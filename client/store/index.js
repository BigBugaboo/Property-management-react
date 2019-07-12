/* eslint-disable no-undef */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from '../reducers';

const sagamiddleware = createSagaMiddleware();

const storageConfig  = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};


const configureStore = () => {
    const middlewares = [sagamiddleware];
    const createStoreMiddleware = applyMiddleware(...middlewares)(createStore);
    const enhancers = [applyMiddleware(...middlewares)];

    // 加入 redux 调试工具
    const composeEnhancers = process.env.NODE_ENV !== 'production' && window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

    const store = createStoreMiddleware(
        // 包装createReducer 即 rootReducer
        persistReducer(storageConfig, rootReducer),composeEnhancers(...enhancers)
    );
    store.runSaga = sagamiddleware.run;
    store.close = () => store.dispatch(END);
    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(persistReducer(storageConfig , createReducer(nextRootReducer)));
        });
    }
    return store;
};

export default configureStore;
