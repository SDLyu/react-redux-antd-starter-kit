import 'isomorphic-fetch';
import _ from 'lodash';

import {cookies, checkStatus, parseJSON, flattenObject} from './utils';

export const BROWSER_SUPPORT = 'BROWSER_SUPPORT';
export const BROWSER_NOT_SUPPORT = 'BROWSER_NOT_SUPPORT';
export const GET_GEOLOCATION_SUCCESS = 'GET_GEOLOCATION_SUCCESS';
export const GET_GEOLOCATION_FAILURE = 'GET_GEOLOCATION_FAILURE';

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
        position: position
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
