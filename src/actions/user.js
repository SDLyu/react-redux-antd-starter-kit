import 'isomorphic-fetch';
import _ from 'lodash';

import {cookies, checkStatus, parseJSON, flattenObject} from './utils';

export const FETCH_ALL_USERS_REQUEST = 'FETCH_ALL_USERS_REQUEST';
export const FETCH_ALL_USERS_SUCCESS = 'FETCH_ALL_USERS_SUCCESS';
export const FETCH_ALL_USERS_FAILURE = 'FETCH_ALL_USERS_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

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

function followUserRequest(id) {
    return {
        type: FOLLOW_USER_REQUEST,
        id
    };
}

function followUserSuccess(user) {
    return {
        type: FOLLOW_USER_SUCCESS,
        user
    };
}

function followUserFailure(errors) {

    return {
        type: FOLLOW_USER_FAILURE,
        errors: errorMessages
    };
}

export function followUser(user) {
    return dispatch => {
        dispatch(followUserRequest(user.id));

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/friendships', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': cookies.get('token')
            },
            body: JSON.stringify({
                user_id: user.id
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(followUserSuccess(user)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(followUserFailure(errors));
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(followUserFailure(json.errors));
                });
            }
         });
    };
}

function unfollowUserRequest(id) {
    return {
        type: UNFOLLOW_USER_REQUEST,
        id
    };
}

function unfollowUserSuccess(user) {
    return {
        type: UNFOLLOW_USER_SUCCESS,
        user
    };
}

function unfollowUserFailure(errors) {

    return {
        type: UNFOLLOW_USER_FAILURE,
        errors: errorMessages
    };
}

export function unfollowUser(user) {
    return dispatch => {
        dispatch(unfollowUserRequest(user.id));

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/friendships', {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': cookies.get('token')
            },
            body: JSON.stringify({
                user_id: user.id
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(unfollowUserSuccess(user)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(unfollowUserFailure(errors));
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(unfollowUserFailure(json.errors));
                });
            }
         });
    };
}
