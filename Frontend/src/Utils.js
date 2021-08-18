const apiConfig = require("./config/api.json");
const config = require("./config/config.json");

const getQueryString = queryString => {
    if(!queryString) return "";
    return Object.keys(queryString).map(key => `${key}=${queryString[key]}`).join("&");
};

const constructURI = (code, queryString, params) => {
    let uri = `${config.baseuri}${apiConfig[code].uri}`;
    const qs = getQueryString(queryString);
    if(qs) uri = `${uri}?${qs}`; 
    if(params) {
        Object.keys(params).forEach(key => {
            uri = uri.replace(`:${key}`, params[key]);
        });
    }
    return uri;
};

const debounce = (fn, delay) => {
    console.log("!!!!!!!!!!!       ");
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn();
        }, delay)
    }
};

module.exports = {
    constructURI,
    debounce,
};  