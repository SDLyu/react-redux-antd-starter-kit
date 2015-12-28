import 'isomorphic-fetch';
import _ from 'lodash';

import {cookies, checkStatus, parseJSON, flattenObject} from './utils';

export const GET_CURRENT_DEVICE_REQUEST = 'GET_CURRENT_DEVICE_REQUEST';
export const GET_CURRENT_DEVICE_SUCCESS = 'GET_CURRENT_DEVICE_SUCCESS';
export const GET_CURRENT_DEVICE_FAILURE = 'GET_CURRENT_DEVICE_FAILURE';
export const GET_ALL_DEVICES_REQUEST = 'GET_ALL_DEVICES_REQUEST';
export const GET_ALL_DEVICES_SUCCESS = 'GET_ALL_DEVICES_SUCCESS';
export const GET_ALL_DEVICES_FAILURE = 'GET_ALL_DEVICES_FAILURE';
export const CREATE_DEVICE_REQUEST = 'CREATE_DEVICE_REQUEST';
export const CREATE_DEVICE_SUCCESS = 'CREATE_DEVICE_SUCCESS';
export const CREATE_DEVICE_FAILURE = 'CREATE_DEVICE_FAILURE';

function saveDeviceToken(token){
    if (token === undefined) return;

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    cookies.set({name: 'device_token', value: token, expires});
}

function getCurrentDeviceRequest() {
    return {
        type: GET_CURRENT_DEVICE_REQUEST,
    };
}

function getCurrentDeviceSuccess(deviceData) {

    return {
        type: GET_CURRENT_DEVICE_SUCCESS,
        deviceData: deviceData
    };
}

function getCurrentDeviceFailure(errors) {

    return {
        type: GET_CURRENT_DEVICE_FAILURE,
        errors: errorMessages
    };
}

export function getCurrentDevice() {
    return dispatch => {
        dispatch(getCurrentDeviceRequest());

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/who', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(getCurrentDeviceSuccess(json)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(getCurrentDeviceFailure(errors));
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(getCurrentDeviceFailure(json.errors));
                });
            }
         });
    };
}

function getAllDevicesRequest() {
    return {
        type: GET_ALL_DEVICES_REQUEST,
    };
}

function getAllDevicesSuccess(deviceData) {
    console.log(deviceData);
    return {
        type: GET_ALL_DEVICES_SUCCESS,
    };
}

function getAllDevicesFailure(errors) {

    return {
        type: GET_ALL_DEVICES_FAILURE,
        errors: errorMessages
    };
}

export function getAllDevices() {
    return dispatch => {
        dispatch(getAllDevicesRequest());

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/my/devices', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': cookies.get('token')
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(getAllDevicesSuccess(json)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(getAllDevicesFailure(errors));
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(getAllDevicesFailure(json.errors));
                });
            }
         });
    };
}

function createDeviceRequest() {
    return {
        type: CREATE_DEVICE_REQUEST,
    };
}

function createDeviceSuccess(token) {
    saveDeviceToken(token);

    return {
        type: CREATE_DEVICE_SUCCESS,
        token: token
    };
}

function createDeviceFailure(errors) {

    return {
        type: CREATE_DEVICE_FAILURE,
        errors: errorMessages
    };
}

export function createDevice(stats) {
    const deviceData = stats.device.current;

    return dispatch => {
        dispatch(createDeviceRequest());

        return fetch('https://commandp-lbs-backend.herokuapp.com/api/v1/my/devices', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': cookies.get('token')
            },
            body: JSON.stringify({
                'device': {
                    'device_type': deviceData.os,
                    'os_version': deviceData.os_version
                }
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(json => dispatch(createDeviceSuccess(json.device.token)))
        .catch((errors) => {
            const response = errors.response;

            if (response === undefined) {
                dispatch(createDeviceFailure(errors));
            } else {
                parseJSON(response).then( (json) => {
                    dispatch(createDeviceFailure(json.errors));
                });
            }
         });
    };
}
