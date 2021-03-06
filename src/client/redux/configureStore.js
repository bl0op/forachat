import {createStore, applyMiddleware, combineReducers, compose} from 'redux'; 
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagas';
import auth from './reducers/auth';
import socket from './reducers/socket';
import user from './reducers/user';
import signup from './reducers/signup';
import messages from './reducers/messages';
import participants from './reducers/participants';


const sagaMiddleware = createSagaMiddleware();
const configureStore = createStore(
    combineReducers({
        auth: auth,
        user: user,
        socket: socket,
        signup: signup,
        participants: participants,
        messages: messages
    }),
    {},
    compose(
        applyMiddleware(sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);
sagaMiddleware.run(rootSaga);

export default configureStore;
