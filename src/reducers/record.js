import {
    FETCH_RECORDS_REQUEST,
    FETCH_RECORDS_SUCCESS,
    FETCH_RECORDS_FAILURE,
} from '../actions/record';

const initialState = {
    devices: null,
    creatingDevice: false,
};

export default function record(state = initialState, action = {}) {
    switch (action.type) {
        case CREATE_DEVICE_REQUEST:
            return Object.assign({}, initialState, {creatingDevice: true});
        case CREATE_DEVICE_SUCCESS:
            return Object.assign({}, state, {creatingDevice: false});
        case CREATE_DEVICE_FAILURE:
            return {
                ...state,
                creatingDevice: false,
            };

        default:
            return state;
    }
}
