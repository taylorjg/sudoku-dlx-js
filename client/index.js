import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import App from './containers/App';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const root = document.getElementById('root');
const version = root.getAttribute('version');

render(
    <Provider store={store}>
        <App version={version} />
    </Provider>,
    root
);
