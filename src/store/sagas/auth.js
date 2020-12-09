import { put, delay, call } from 'redux-saga/effects';
import { logout } from '../actions';
import axios from 'axios';

import * as actions from '../actions';

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationDate');
    yield call([localStorage, 'removeItem'], 'userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtxmb3dYmazkYxmvyA_rPDD-97yZQ4CIk';

    if (!action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtxmb3dYmazkYxmvyA_rPDD-97yZQ4CIk'
    }

    try {
        const response = yield call([axios, 'post'], url, authData);

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);

        yield call([localStorage, 'setItem'], 'token', response.data.idToken)
        yield call([localStorage, 'setItem'], 'expirationDate', expirationDate)
        yield call([localStorage, 'setItem'], 'userId', response.data.localId)

        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));

    }
}

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token');

    if (token) {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate < new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield call([localStorage, 'getItem'], 'userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    } else {
        yield put(actions.logout());
    }
}