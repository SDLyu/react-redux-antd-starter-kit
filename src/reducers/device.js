import {
    GET_CURRENT_DEVICE_REQUEST,
    GET_CURRENT_DEVICE_SUCCESS,
    GET_CURRENT_DEVICE_FAILURE,
    CREATE_DEVICE_REQUEST,
    CREATE_DEVICE_SUCCESS,
    CREATE_DEVICE_FAILURE
} from '../actions/device';

const initialState = {
    devices: null,
    current: null,
    gettingDevice: false,
    creatingDevice: false,
};

export default function device(state = initialState, action = {}) {
    switch (action.type) {
        case GET_CURRENT_DEVICE_REQUEST:
            return Object.assign({}, initialState, {gettingDevice: true});
        case GET_CURRENT_DEVICE_SUCCESS:
            return Object.assign({}, state, {current: action.deviceData, gettingDevice: false});
        case GET_CURRENT_DEVICE_FAILURE:
            return {
                ...state,
                gettingDevice: false,
                current: null
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

        default:
            return state;
    }
}
