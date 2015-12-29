import _ from 'lodash';
import {
    FETCH_ALL_USERS_REQUEST,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAILURE,
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAILURE,
    UNFOLLOW_USER_REQUEST,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAILURE,
} from '../actions/user';

const initialState = {
    users: [],
    followedUsers: [],
    followingUserId: null,
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
        case FOLLOW_USER_REQUEST:
            return Object.assign({}, state, {followingUserId: action.id});
        case FOLLOW_USER_SUCCESS:
            state.followedUsers.push(action.user);
            return Object.assign({}, state, {followingUserId: null});
        case FOLLOW_USER_FAILURE:
            return {
                ...state,
                followingUserId: null
            };
        case UNFOLLOW_USER_REQUEST:
            return Object.assign({}, state, {followingUserId: action.id});
        case UNFOLLOW_USER_SUCCESS:
            // Need refectoring
            let followedUsers = _.reject(state.followedUsers, _.find(state.followedUsers, (user) => {return action.user.id == user.id}));
            return Object.assign({}, state, {followingUserId: null, followedUsers});
        case UNFOLLOW_USER_FAILURE:
            return {
                ...state,
                followingUserId: null
            };

        default:
            return state;
    }
}
