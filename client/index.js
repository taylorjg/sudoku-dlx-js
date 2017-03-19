import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import App from './containers/App';
import { PUZZLE } from './constants';
import solve from './solve';

const solution = solve(PUZZLE);
const store = createStore(rootReducer);

render(
    <Provider store={store}>
        <App solution={solution} />
    </Provider>,
    document.getElementById('root')
);
