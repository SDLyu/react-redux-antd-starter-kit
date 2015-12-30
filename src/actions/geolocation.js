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

export const GET_NEAR_PLACES_REQUEST = 'GET_NEAR_PLACES_REQUEST';
export const GET_NEAR_PLACES_SUCCESS = 'GET_NEAR_PLACES_SUCCESS';
export const GET_NEAR_PLACES_FAILURE = 'GET_NEAR_PLACES_FAILURE';
export const CLEAR_GET_NEAR_PLACES_ERRORS = 'CLEAR_GET_NEAR_PLACES_ERRORS';

export const GET_CHECK_IN_REQUEST = 'GET_CHECK_IN_REQUEST';
export const GET_CHECK_IN_SUCCESS = 'GET_CHECK_IN_SUCCESS';
export const GET_CHECK_IN_FAILURE = 'GET_CHECK_IN_FAILURE';

export const DELETE_CHECK_IN_REQUEST = 'DELETE_CHECK_IN_REQUEST';
export const DELETE_CHECK_IN_SUCCESS = 'DELETE_CHECK_IN_SUCCESS';
export const DELETE_CHECK_IN_FAILURE = 'DELETE_CHECK_IN_FAILURE';

export const UPDATE_CHECK_IN_REQUEST = 'UPDATE_CHECK_IN_REQUEST';
export const UPDATE_CHECK_IN_SUCCESS = 'UPDATE_CHECK_IN_SUCCESS';
export const UPDATE_CHECK_IN_FAILURE = 'UPDATE_CHECK_IN_FAILURE';

export const EDIT_CHECK_IN = 'EDIT_CHECK_IN';
export const CANCEL_EDIT_CHECK_IN = 'CANCEL_EDIT_CHECK_IN';

export const GET_NEAR_CHECK_IN_REQUEST = 'GET_NEAR_CHECK_IN_REQUEST';
export const GET_NEAR_CHECK_IN_SUCCESS = 'GET_NEAR_CHECK_IN_SUCCESS';
export const GET_NEAR_CHECK_IN_FAILURE = 'GET_NEAR_CHECK_IN_FAILURE';

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

function checkInRequest() {
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

function createPlaceRequest() {
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

function getNearPlacesRequest() {
    return {
        type: GET_NEAR_PLACES_REQUEST,
    };
}

function getNearPlacesSuccess(res) {
    const {places} = res;

    return {
        type: GET_NEAR_PLACES_SUCCESS,
        places
     };
}

function getNearPlacesFailure() {
    return {
        type: GET_NEAR_PLACES_FAILURE,
        error: 'Not Found',
    };
}

export function getNearPlaces(lat, lon) {
    return (dispatch, getState) => {
        dispatch(getNearPlacesRequest());

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/places/near?lat=' + lat + '&lon=' + lon + '&radius=10', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': cookies.get('token')
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(getNearPlacesSuccess(json)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(getNearPlacesFailure());
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(getNearPlacesFailure());
                });
            }
         });
    };
}

export function clearGetNearPlacesErrors() {
    return {
        type: CLEAR_GET_NEAR_PLACES_ERRORS,
    };
}


function getCheckInRequest() {
    return {
        type: GET_CHECK_IN_REQUEST,
    };
}

function getCheckInSuccess(res) {
    const {checkins} = res;

    return {
        type: GET_CHECK_IN_SUCCESS,
        checkIns: checkins
     };
}

function getCheckInFailure(errors) {

    return {
        type: GET_CHECK_IN_FAILURE,
        errors: errors
    };
}

export function getCheckIn(userId) {
    return (dispatch, getState) => {
        dispatch(getCheckInRequest());

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/users/' + userId + '/checkins', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': cookies.get('token')
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(getCheckInSuccess(json)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(getCheckInFailure(errors));
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(getCheckInFailure(json.errors));
                });
            }
         });
    };
}

function updateCheckInRequest(id) {
    return {
        type: UPDATE_CHECK_IN_REQUEST,
        id
    };
}

function updateCheckInSuccess(res) {
    return {
        type: UPDATE_CHECK_IN_SUCCESS,
     };
}

function updateCheckInFailure(errors) {
    return {
        type: UPDATE_CHECK_IN_FAILURE,
        errors: errors
    };
}

export function updateCheckIn(checkInId, placeId, comment) {
    return (dispatch, getState) => {
        dispatch(updateCheckInRequest(checkInId));

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/checkins/' + checkInId, {
            method: 'put',
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
        .then(json => dispatch(updateCheckInSuccess(json)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(updateCecheckInFailure(errors));
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(updateCheckInFailure(json.errors));
                });
            }
         });
    };
}

function deleteCheckInRequest(id) {
    return {
        type: DELETE_CHECK_IN_REQUEST,
        id
    };
}

function deleteCheckInSuccess(id) {
    return {
        type: DELETE_CHECK_IN_SUCCESS,
        id
     };
}

function deleteCheckInFailure(errors) {
    return {
        type: DELETE_CHECK_IN_FAILURE,
        errors: errors
    };
}

export function deleteCheckIn(checkInId) {
    return (dispatch, getState) => {
        dispatch(deleteCheckInRequest(checkInId));

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/checkins/' + checkInId, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': cookies.get('token')
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(deleteCheckInSuccess(checkInId)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(deleteCecheckInFailure(errors));
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(deleteCheckInFailure(json.errors));
                });
            }
         });
    };
}

export function editCheckIn(id) {
    return {
        type: EDIT_CHECK_IN,
        id
    }
}

function getNearCheckInRequest() {
    return {
        type: GET_NEAR_CHECK_IN_REQUEST,
    };
}

function getNearCheckInSuccess(res) {
    const {checkins} = res;

    return {
        type: GET_NEAR_CHECK_IN_SUCCESS,
        checkins
     };
}

function getNearCheckInFailure() {
    return {
        type: GET_NEAR_CHECK_IN_FAILURE,
        error: 'Not Found',
    };
}

export function getNearCheckIn(lat, lon) {
    return (dispatch, getState) => {
        dispatch(getNearCheckInRequest());

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/checkins/neighbor', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': cookies.get('token')
            },
            body: JSON.stringify({
                lat,
                lon,
                redius: 10
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(getNearCheckInSuccess(json)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(getNearCheckInFailure());
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(getNearCheckInFailure());
                });
            }
         });
    };
}

export function cancelEditCheckIn() {
    return {
        type: CANCEL_EDIT_CHECK_IN,
    }
}
