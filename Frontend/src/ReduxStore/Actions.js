export const CHANGE_TAB = "CHANGE_TAB";
export const TOGGLE_ADD_SUB_DRAWER = "TOGGLE_ADD_SUB_DRAWER";
export const ADD_SUBSCRIPTION = "ADD_SUBSCRIPTION";
export const LOAD_SUBSCRIPTIONS = "LOAD_SUBSCRIPTIONS";
export const APPEND_USERS = "APPEND_USERS";
export const ADD_USER = "ADD_USER";
export const TOGGLE_ADD_USER_DRAWER = "TOGGLE_ADD_USER_DRAWER";
export const TOGGLE_UPDATE_USER_DRAWER = "TOGGLE_UPDATE_USER_DRAWER";
export const LOAD_USERS = "LOAD_USERS";

export const changeTab = (data) => {
    return {
        type: CHANGE_TAB,
        tab: data
    };
};

export const toggleAddSubDrawer = () => {
    return {
        type: TOGGLE_ADD_SUB_DRAWER
    };
};

export const toggleAddUserDrawer = () => {
    return {
        type: TOGGLE_ADD_USER_DRAWER
    };
};

export const toggleUpdateUserDrawer = () => {
    return {
        type: TOGGLE_UPDATE_USER_DRAWER
    }
}

export const addSubscription = (data) => {
    return {
        type: ADD_SUBSCRIPTION,
        subscription: data
    };
};

export const loadSubscriptions = (data) => {
    return {
        type: LOAD_SUBSCRIPTIONS,
        subscriptions: data
    };
};

export const appendUsers = (data) => {
    return {
        type: APPEND_USERS,
        users: data
    };
};

export const loadUsers = (data) => {
    return {
        type: LOAD_USERS,
        users: data
    }
}

export const addUsers = (data) => {
    return {
        type: ADD_USER,
        users: data
    };
};