import {
    BROWSER_SUPPORT,
    BROWSER_NOT_SUPPORT,
    GET_GEOLOCATION_SUCCESS,
    GET_GEOLOCATION_FAILURE,
    CREATE_PLACE_REQUEST,
    CREATE_PLACE_SUCCESS,
    CREATE_PLACE_FAILURE,
    CHECK_IN_REQUEST,
    CHECK_IN_SUCCESS,
    CHECK_IN_FAILURE
} from '../actions/geolocation';

const initialState = {
    support: null,
    placeId: null,
    checkInId: null,
    placeName: null,
    lat: 25.047924,
    lon: 121.517065,
    creatingPlace: false,
    checkingIn: false
};

export default function record(state = initialState, action = {}) {
    switch (action.type) {
        case BROWSER_NOT_SUPPORT:
            return Object.assign({}, initialState, {support: true});
        case BROWSER_NOT_SUPPORT:
            return Object.assign({}, initialState, {support: false});
        case GET_GEOLOCATION_SUCCESS:
            return Object.assign({}, initialState, {lat: action.lat, lon: action.lon});
        case GET_GEOLOCATION_FAILURE:
            return {
                ...state,
            };
        case CREATE_PLACE_REQUEST:
            return Object.assign({}, state, {creatingPlace: true});
        case CREATE_PLACE_SUCCESS:
            return Object.assign({}, state, {creatingPlace: false, placeId: action.id, placeName: action.name});
        case CREATE_PLACE_FAILURE:
            return Object.assign({}, state, {creatingPlace: false});
        case CHECK_IN_REQUEST:
            return Object.assign({}, state, {checkingIn: true});
        case CHECK_IN_SUCCESS:
            return Object.assign({}, state, {checkingIn: false, checkInId: action.id});
        case CHECK_IN_FAILURE:
            return Object.assign({}, state, {checkingIn: false});

        default:
            return state;
    }
}
