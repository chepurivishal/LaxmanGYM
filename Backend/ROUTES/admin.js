const serviceHandler = require("../Utils/servicehandler").serviceHandler;
const BuilderService = require("../Service/BuilderService");
const Promise       = require("bluebird");
const _             = require("lodash");
const codes         = require("../config/codes.json");
const config        = require("../config/serverconfig.json");

const adminLogin = (req, res) => {
    const serviceInst = BuilderService['admin'];
    const username = req.query.username;
    const password = req.query.password;
    if(!username || !password) return Promise.reject("MISSING_REQ_FIELDS_IN_QUERY_PARAMS");
    return serviceHandler(req, res, serviceInst.login(username, password));
};

const createAdmin = (req, res) => {
    const serviceInst = BuilderService["admin"];
    const body = req.body;
    return serviceHandler(req, res, serviceInst.createAdmin(body.username, body.password));
};

module.exports = (app) => {
    app.get("/laxmangym/adminlogin", (req, res) => adminLogin(req, res));
    app.post("/laxmangym/createadmin", (req, res) => createAdmin(req, res));
}