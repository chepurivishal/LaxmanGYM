const axios = require("axios");
const apiConfig = require("./config/api.json");
const utils = require("./Utils");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const APIS = {
    login: async (data) => {
        let response;
        try {
            response = await axios({
                url: utils.constructURI("login", data),
                method: apiConfig.login.method,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (err) {
            console.log(" === ERROR === ", err.response);
            return err.response;
        }
        return response;
    },
    getSubscriptions: async (adminId, token) => {
        let response;
        try {
            response = await axios({
                url: utils.constructURI("getSubscriptions", {}, {
                    adminId
                }),
                method: apiConfig.getSubscriptions.method,
                headers: {
                    authorization: token
                }
            });
        } catch (err) {
            console.log(" === ERROR === ", err);
        }
        return response.data;
    },
    createSubscription: async (adminId, token, body) => {
        let response;
        try {
            response = await axios({
                url: utils.constructURI("createSubscription", {}, {
                    adminId
                }),
                method: apiConfig.createSubscription.method,
                headers: {
                    authorization: token
                },
                data: body
            });
        } catch (err) {
            console.log(" === ERROR === ", err);
        }
        return response.data;
    },

    updateSubscription: async (adminId, token, body, id) => {
        let response;
        try {
            response = await axios({
                url: utils.constructURI("updateSubscription", {}, {
                    adminId,
                    id
                }),
                method: apiConfig.updateSubscription.method,
                headers: {
                    authorization: token
                },
                data: body
            });
        } catch (err) {
            console.log(" === ERROR === ", err);
        }
        return response.data;
    },

    deleteSubscription: async (adminId, token, id) => {
        let response;
        try {
            response = await axios({
                url: utils.constructURI("deleteSubscription", {}, {
                    adminId,
                    id
                }),
                method: apiConfig.deleteSubscription.method,
                headers: {
                    authorization: token
                }
            });
        } catch (err) {
            console.log(" === ERROR === ", err);
        }
        return response.data;
    },
    getQuote: async () => {
        let response;
        try {
            response = await axios({
                url: apiConfig.quotes.uri,
                method: apiConfig.quotes.method
            });
        } catch (err) {
            console.log(" === ERROR === ", err);
        }
        return response.data[getRandomInt(1500)];
    },
    createUser: async (adminId, token, data) => {
        let response;
        try {
            response = await axios({
                url: utils.constructURI("createUser", {}, {
                    adminId
                }),
                method: apiConfig.createSubscription.method,
                headers: {
                    authorization: token
                },
                data: data
            });
        } catch (err) {
            console.log(" === ERROR === ", err);
        }
        return response.data;
    },
    getUsers: async (adminId, token, skip, limit) => {
        let response;
        if(!skip) skip = 0;
        if(!limit) limit=20;
        try {
            response = await axios({
                url: utils.constructURI("getUsers", {skip, limit}, {
                    adminId
                }),
                method: apiConfig.getUsers.method,
                headers: {
                    authorization: token
                }
            });
        } catch(err) {
            console.log(" === ERROR === ", err);
        }
        return response.data;
    },
    s3upload: (adminId, token, data) => {
        let request;
        request = axios({
            url: utils.constructURI("s3upload", {}, {
                adminId
            }),
            method: apiConfig.s3upload.method,
            headers: {
                authorization: token
            },
            data,
        });
        return request
        .then(res => res.data);
    },
    updateUser: (adminId, token, id, data) => {
        let request = axios({
            url: utils.constructURI("updateUser", {}, {adminId, id}),
            method: apiConfig.updateUser.method,
            headers: {authorization: token},
            data,
        });
        return request.then(res => res.data);
    },
    getExpiringUsers: (adminId, token) => {
        let request = axios({
            url: utils.constructURI("getExpiringUsers", {}, {adminId}),
            method: apiConfig.getExpiringUsers.method,
            headers: {authorization: token}
        });
        return request.then(res => res.data);
    },
    searchUser: (adminId, token, name) => {
        let request = axios({
            url: utils.constructURI("searchUser", {}, {adminId, name}),
            method: apiConfig.searchUser.name,
            headers: {authorization: token}
        });
        return request.then(res => res.data);
    },
    sendNotification: (adminId, token, data) => {
        let request = axios({
            url: utils.constructURI("sendNotification", {}, {adminId}),
            method: apiConfig.sendNotification.method,
            headers: {authorization: token},
            data,
        });
        return request.then(res => res.data);
    },
    getBirthdayUsers: (adminId, token) => {
        let request = axios({
            url: utils.constructURI("getBirthdayUsers", {}, {adminId}),
            method: apiConfig.getBirthdayUsers.method,
            headers: {authorization: token}
        });
        return request.then(res => res.data);
    },
    renewSubscription: (adminId, token, id, subscriptionId) => {
        let request = axios({
            url: utils.constructURI("renewSubscription", {subscriptionId}, {adminId, id}),
            method: apiConfig.renewSubscription.method,
            headers: {authorization: token}
        });
        return request.then(res => res.data);
    }
};

export default APIS;