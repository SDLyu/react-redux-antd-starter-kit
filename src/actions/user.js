import 'isomorphic-fetch';
import _ from 'lodash';

import {cookies, checkStatus, parseJSON, flattenObject} from './utils';

export const FETCH_ALL_USERS_REQUEST = 'FETCH_ALL_USERS_REQUEST';
export const FETCH_ALL_USERS_SUCCESS = 'FETCH_ALL_USERS_SUCCESS';
export const FETCH_ALL_USERS_FAILURE = 'FETCH_ALL_USERS_FAILURE';

function fetchAllUsersRequest() {
    return {
        type: FETCH_ALL_USERS_REQUEST,
    };
}

function fetchAllUsersSuccess(res) {
    const {users} = res;
    return {
        type: FETCH_ALL_USERS_SUCCESS,
        users
    };
}

function fetchAllUsersFailure(errors) {

    return {
        type: FETCH_ALL_USERS_FAILURE,
        errors: errorMessages
    };
}

export function fetchAllUsers() {
    return dispatch => {
        dispatch(fetchAllUsersRequest());

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/users', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': cookies.get('token')
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(fetchAllUsersSuccess(json)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(fetchAllUsersFailure(errors));
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(fetchAllUsersFailure(json.errors));
                });
            }
         });
    };
}
