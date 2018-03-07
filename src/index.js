import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';

import ActionReducers from './reducers';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from './app';

let store = createStore(ActionReducers,{boardCollection: [],listCollection: []},applyMiddleware(thunk));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);