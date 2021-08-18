import { Drawer } from '@chakra-ui/modal';
import { combineReducers } from 'redux';
import {
    CHANGE_TAB,
    TOGGLE_ADD_SUB_DRAWER,
    LOAD_SUBSCRIPTIONS,
    ADD_SUBSCRIPTION,
    APPEND_USERS,
    ADD_USER,
    TOGGLE_ADD_USER_DRAWER,
    TOGGLE_UPDATE_USER_DRAWER,
    LOAD_USERS
} from "./Actions";

const initialTogglerState = {
    addSubscriptionDrawer: false,
    addUserDrawer: false,
    updateUserDrawer: false
};

const initialSubscriptionsState = {
    subscriptions: []
};

const initialUsersState = {
    users: []
};

const TabReducer = (state = {value: "users"}, action) => {
    switch(action.type) {
        case CHANGE_TAB:
            return {
                ...state,
                value: action.tab
            };
        default:
            return state;
    }
};

const DrawerToggleReducer = (state = initialTogglerState, action) => {
    switch(action.type) {
        case TOGGLE_ADD_SUB_DRAWER:
            return {
                ...state,
                addSubscriptionDrawer: !state.addSubscriptionDrawer
            };

        case TOGGLE_ADD_USER_DRAWER:
            return {
                ...state,
                addUserDrawer: !state.addUserDrawer
            }
        case TOGGLE_UPDATE_USER_DRAWER:
            return {
                ...state,
                updateUserDrawer: !state.updateUserDrawer
            }
        default:
            return state;
    };
};

const SubscriptionsReducer = (state = initialSubscriptionsState, action) => {
    switch(action.type) {
        case ADD_SUBSCRIPTION:
            return {
                ...state,
                subscriptions: [...state.subscriptions, action.subscription]
            };
        case LOAD_SUBSCRIPTIONS:
            return {
                ...state,
                subscriptions: action.subscriptions
            };
        default:
            return state;
    }
};

const UsersReducer = (state = initialUsersState, action) => {
    switch(action.type) {
        case APPEND_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            };
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.user]
            };
        case LOAD_USERS:
            return {
                ...state,
                users: action.users
            }
        default:
            return state;
    }
}

export default combineReducers({
    tab: TabReducer,
    toggler: DrawerToggleReducer,
    subscriptions: SubscriptionsReducer,
    users: UsersReducer,
});