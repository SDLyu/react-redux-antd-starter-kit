import 'isomorphic-fetch';
import _ from 'lodash';

import {createDevice, clearDeviceInformation} from './device';
import {cookies, checkStatus, parseJSON, flattenObject} from './utils';

export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILURE = 'EDIT_PROFILE_FAILURE';

function saveToken(token){
    if (token === undefined) return;

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    cookies.set({name: 'token', value: token, expires});
}

export function fetchProfile() {
    let token = cookies.get('token');

    if (token === undefined) {
        return {type: 'TOKEN_NOT_FOUND'};
    }
    return dispatch => {

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/my?token=' + token, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(loginSuccess(json)));
    }
}

function registerRequest() {
    return {
        type: REGISTER_REQUEST,
    };
}

function registerSuccess(res) {
    saveToken(res.access_token);

    return {
        type: REGISTER_SUCCESS,
        user: res.user,
    };
}

function registerFailure(errors) {
    let flattenErrors = flattenObject(errors);
    let errorMessages = [];

    for (let errorKey in flattenErrors) {
        let key = errorKey.split('.')[0];
        let message = _.capitalize(key + ' ' + flattenErrors[errorKey]);

        errorMessages.push(message);
    }

    return {
        type: REGISTER_FAILURE,
        errors: errorMessages
    };
}

export function register(username, email, password) {
    return (dispatch, getState) => {
        dispatch(registerRequest());

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(registerSuccess(json)))
        .then(() => dispatch(createDevice(getState())))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(registerFailure(errors));
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(registerFailure(json.errors));
                });
            }
         });
    };
}

function loginRequest(user) {
    return {
        type: LOGIN_REQUEST,
    };
}

function loginSuccess(res) {
    saveToken(res.access_token);

    return {
        type: LOGIN_SUCCESS,
        user: res.user
    };
}

function loginFailure(errors) {

    return {
        type: LOGIN_FAILURE,
        errors: errors
    };
}

export function login(username, password) {
    return (dispatch, getState) => {
        dispatch(loginRequest());

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/login', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(loginSuccess(json)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(loginFailure(errors));
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(loginFailure(json.errors));
                });
            }
         });
    };
}

export function logout() {
    cookies.unset('token');

    return {
        type: LOGOUT_SUCCESS
    }
}

function editProfileRequest(user) {
    return {
        type: EDIT_PROFILE_REQUEST,
    };
}

function editProfileSuccess(res) {
    return {
        type: EDIT_PROFILE_SUCCESS,
        user: res.user
    };
}

function editProfileFailure(errors) {
    let flattenErrors = flattenObject(errors);
    let errorMessages = [];

    for (let errorKey in flattenErrors) {
        let key = errorKey.split('.')[0];
        let message = _.capitalize(key + ' ' + flattenErrors[errorKey]);

        errorMessages.push(message);
    }

    return {
        type: EDIT_PROFILE_FAILURE,
        errors: errorMessages
    };
}

export function editProfile(email, password, nickname) {
    return dispatch => {
        dispatch(editProfileRequest());

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/my', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': cookies.get('token')
            },
            body: JSON.stringify({
                user: {
                    email: email,
                    password: password,
                    display_name: nickname
                }
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(editProfileSuccess(json)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(editProfileFailure(errors));
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(editProfileFailure(json.errors));
                });
            }
         });
    };
}
