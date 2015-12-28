import 'isomorphic-fetch';
import _ from 'lodash';

import {cookies, checkStatus, parseJSON, flattenObject} from './utils';

export const FETCH_RECORDS_REQUEST = 'FETCH_RECORDS_REQUEST';
export const FETCH_RECORDS_SUCCESS = 'FETCH_RECORDS_SUCCESS';
export const FETCH_RECORDS_REQUEST = 'FETCH_RECORDS_REQUEST';

function fetchRecordsRequest() {
    return {
        type: FETCH_RECORDS_REQUEST,
    };
}

function fetchRecordsSuccess(res) {

    return {
        type: FETCH_RECORDS_SUCCESS,
    };
}

function fetchRecordsFailure(errors) {

    return {
        type: FETCH_RECORDS_FAILURE,
        errors: errorMessages
    };
}

export function fetchRecords() {
    return dispatch => {
        dispatch(fetchRecordsRequest());

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/my/feed', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': cookies.get('token')
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(fetchRecordsSuccess(json)))
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
