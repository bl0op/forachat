import { put } from 'redux-saga/effects';
import * as ActionCreators from '../ActionCreators';
import socket from '../../socket/setupSocket';
import url from '../../shared/url';

export function* authUser(action) {
    try {
        //start authorization
        yield put(ActionCreators.authStart());
        //get jwt token as httponly cookie
        const res = yield fetch(url+'login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            credentials: 'include',
            body: 
                JSON.stringify({
                    username: action.user,
                    password: action.password
                })
        });
        if(res.status === 200){
            //refresh page with jwt token set up
            window.location.reload(true);
            console.log('from auth');
            yield put(ActionCreators.authSuccess());
        }
        else {
            const body = yield res.json();
            yield put(ActionCreators.authFailed(body.message));
        }
    }
    catch(e) {
       yield put(ActionCreators.authFailed(e.message));
    }
}

export function* authLogout() {
    yield put(ActionCreators.authLogoutEnd());
    //disconnect token
    socket.disconnect();
    //clear token
    yield fetch(url + 'logout', {
      method: 'POST',
      credentials: 'include',
    });
}

