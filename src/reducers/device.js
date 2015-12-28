import {
    GET_CURRENT_DEVICE_REQUEST,
    GET_CURRENT_DEVICE_SUCCESS,
    GET_CURRENT_DEVICE_FAILURE,
    GET_ALL_DEVICES_REQUEST,
    GET_ALL_DEVICES_SUCCESS,
    GET_ALL_DEVICES_FAILURE,
    CREATE_DEVICE_REQUEST,
    CREATE_DEVICE_SUCCESS,
    CREATE_DEVICE_FAILURE,
    DELETE_DEVICE_REQUEST,
    DELETE_DEVICE_SUCCESS,
    DELETE_DEVICE_FAILURE,
    CLEAR_DEVICE_INFORMATION,
} from '../actions/device';

const initialState = {
    devices: null,
    current: null,
    gettingCurrentDevice: false,
    gettingAllDevices: false,
    creatingDevice: false,
    deletingDevice: false
};

export default function device(state = initialState, action = {}) {
    switch (action.type) {
        case GET_CURRENT_DEVICE_REQUEST:
            return Object.assign({}, initialState, {gettingCurrentDevice: true});
        case GET_CURRENT_DEVICE_SUCCESS:
            return Object.assign({}, state, {current: action.deviceData, gettingCurrentDevice: false});
        case GET_CURRENT_DEVICE_FAILURE:
            return {
                ...state,
                gettingCurrentDevice: false,
                current: null
            };
        case GET_ALL_DEVICES_REQUEST:
            return Object.assign({}, state, {gettingAllDevices: true});
        case GET_ALL_DEVICES_SUCCESS:
            return Object.assign({}, state, {devices: action.devices, gettingAllDevices: false});
        case GET_ALL_DEVICES_FAILURE:
            return {
                ...state,
                gettingAllDevices: false,
            };
        case CREATE_DEVICE_REQUEST:
            return Object.assign({}, state, {creatingDevice: true});
        case CREATE_DEVICE_SUCCESS:
            return Object.assign({}, state, {creatingDevice: false, token: action.token});
        case CREATE_DEVICE_FAILURE:
            return {
                ...state,
                creatingDevice: false,
            };
        case DELETE_DEVICE_REQUEST:
            return Object.assign({}, state, {deletingDevice: true});
        case DELETE_DEVICE_SUCCESS:
            let devices = _.reject(state.devices, (device) => {
                return device.token == action.token;
            });
            console.log(devices);
            return Object.assign({}, state, {deletingDevice: false, devices: devices});
        case DELETE_DEVICE_FAILURE:
            return {
                ...state,
                deletingDevice: false,
            };
        case CLEAR_DEVICE_INFORMATION:
            return Object.assign({}, initialState, {current: state.current});
        default:
            return state;
    }
}
