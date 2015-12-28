import {
    BROWSER_SUPPORT,
    BROWSER_NOT_SUPPORT,
    GET_GEOLOCATION_SUCCESS,
    GET_GEOLOCATION_FAILURE
} from '../actions/geolocation';

const initialState = {
    support: null
};

export default function record(state = initialState, action = {}) {
    switch (action.type) {
        case BROWSER_NOT_SUPPORT:
            return Object.assign({}, initialState, {support: true});
        case BROWSER_NOT_SUPPORT:
            return Object.assign({}, initialState, {support: false});
        case GET_GEOLOCATION_SUCCESS:
            return Object.assign({}, initialState, {position: action.position});
        case GET_GEOLOCATION_FAILURE:
            return {
                ...state,
            };

        default:
            return state;
    }
}
