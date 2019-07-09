/* eslint-disable no-undef */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

const configureStore = () => {
    const middlewares = [thunkMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];

    // 加入 redux 调试工具
    const composeEnhancers = process.env.NODE_ENV !== 'production' && window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

    const store = createStore(rootReducer, composeEnhancers(...enhancers));

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
};

export default configureStore;