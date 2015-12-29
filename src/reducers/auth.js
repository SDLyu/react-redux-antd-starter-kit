import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE,
    CLEAR_SAVE_SUCCESS_MESSAGE
} from '../actions/auth';

const initialState = {
    user: null,
    registering: false,
    loggingIn: false,
    loggingOut: false,
    editingProfile: false,
    showSaveSuccessMessage: false,
    registersErrors: null,
    loginErrors: null,
    editingProfileErrors: null,
};

export default function auth(state = initialState, action = {}) {
    switch (action.type) {
        case REGISTER_REQUEST:
            return Object.assign({}, initialState, {registering: true});
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {user: action.user, registering: false, registerErrors: null});
        case REGISTER_FAILURE:
            return {
                ...state,
                registering: false,
                user: null,
                registerErrors: action.errors
            };

        case LOGIN_REQUEST:
            return Object.assign({}, initialState, {loggingIn: true});
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {user: action.user, loggingIn: false, loginErrors: null});
        case LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                user: null,
                loginErrors: action.errors
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loggingOut: false,
                user: null,
                loginErrors: null
            };
        case EDIT_PROFILE_REQUEST:
            return Object.assign({}, state, {editingProfile: true, editProfileErrors: null});
        case EDIT_PROFILE_SUCCESS:
            return Object.assign({}, state, {user: action.user, editingProfile: false, showSaveSuccessMessage: true, editProfileErrors: null});
        case EDIT_PROFILE_FAILURE:
            return {
                ...state,
                editingProfile: false,
                editProfileErrors: action.errors
            };
        default:
            return state;
    }
}
