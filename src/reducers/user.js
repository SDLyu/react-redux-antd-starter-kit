import {
    FETCH_ALL_USERS_REQUEST,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAILURE,
} from '../actions/user';

const initialState = {
    users: null,
    fetchingAllUsers: false,
};

export default function record(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_ALL_USERS_REQUEST:
            return Object.assign({}, initialState, {fetchingAllUsers: true});
        case FETCH_ALL_USERS_SUCCESS:
            return Object.assign({}, state, {fetchingAllUsers: false, users: action.users});
        case FETCH_ALL_USERS_FAILURE:
            return {
                ...state,
                fetchingAllUsers: false,
            };

        default:
            return state;
    }
}
