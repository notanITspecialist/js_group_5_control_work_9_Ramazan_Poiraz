import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Container} from "reactstrap";
import thunk from "redux-thunk";

import 'bootstrap/dist/css/bootstrap.min.css';
import reducer from "./reducer/reducer";

const rootReducer = combineReducers({
    reducer: reducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
        <Container>
            <Provider store={store}>
                <App />
            </Provider>
        </Container>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
