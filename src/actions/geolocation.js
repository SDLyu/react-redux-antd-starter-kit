import 'isomorphic-fetch';
import _ from 'lodash';

import {cookies, checkStatus, parseJSON, flattenObject} from './utils';

export const BROWSER_SUPPORT = 'BROWSER_SUPPORT';
export const BROWSER_NOT_SUPPORT = 'BROWSER_NOT_SUPPORT';
export const GET_GEOLOCATION_SUCCESS = 'GET_GEOLOCATION_SUCCESS';
export const GET_GEOLOCATION_FAILURE = 'GET_GEOLOCATION_FAILURE';
export const CHECK_IN_REQUEST = 'CHECK_IN_REQUEST';
export const CHECK_IN_SUCCESS = 'CHECK_IN_SUCCESS';
export const CHECK_IN_FAILURE = 'CHECK_IN_FAILURE';
export const CREATE_PLACE_REQUEST = 'CREATE_PLACE_REQUEST';
export const CREATE_PLACE_SUCCESS = 'CREATE_PLACE_SUCCESS';
export const CREATE_PLACE_FAILURE = 'CREATE_PLACE_FAILURE';

function browserSupport() {
    return {
        type: BROWSER_SUPPORT,
    }
}

function browserNotSupport() {
    return {
        type: BROWSER_NOT_SUPPORT,
    }
}

function getGeoLocationSuccess(position) {
    return {
        type: GET_GEOLOCATION_SUCCESS,
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }
}

function getGeoLocationfailure() {
    return {
        type: GET_GEOLOCATION_FAILURE,
    }
}

export function getGeoLocation() {
    return dispatch => {
        if (navigator.geolocation) {
            dispatch(browserSupport());

            navigator.geolocation.getCurrentPosition(
                (position) => dispatch(getGeoLocationSuccess(position)),
                (error) => dispatch(getGeoLocationfailure())
            );
        } else {
            dispatch(browserNotSupport());
        }
    }
}

function checkInRequest(user) {
    return {
        type: CHECK_IN_REQUEST,
    };
}

function checkInSuccess(res) {
    const {checkin} = res;

    return {
        type: CHECK_IN_SUCCESS,
        id: checkin.id
     };
}

function checkInFailure(errors) {

    return {
        type: CHECK_IN_FAILURE,
        errors: errors
    };
}

export function checkIn(placeId, comment) {
    return (dispatch, getState) => {
        dispatch(checkInRequest());

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/checkins', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': cookies.get('token')
            },
            body: JSON.stringify({
                place_id: placeId,
                comment
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(checkInSuccess(json)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(checkInFailure(errors));
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(checkInFailure(json.errors));
                });
            }
         });
    };
}

function createPlaceRequest(user) {
    return {
        type: CREATE_PLACE_REQUEST,
    };
}

function createPlaceSuccess(res) {
    const {place} = res;

    return {
        type: CREATE_PLACE_SUCCESS,
        id: place.id,
        name: place.name
    };
}

function createPlaceFailure(errors) {

    return {
        type: CREATE_PLACE_FAILURE,
        errors: errors
    };
}

export function createPlace(name, lat, lng) {
    return (dispatch, getState) => {
        dispatch(createPlaceRequest());

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/places', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': cookies.get('token')
            },
            body: JSON.stringify({
                name,
                lat,
                lng
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(createPlaceSuccess(json)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(createPlaceFailure(errors));
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(createPlaceFailure(json.errors));
                });
            }
         });
    };
}


