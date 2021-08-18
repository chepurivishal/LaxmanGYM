const serviceHandler = require("../Utils/servicehandler").serviceHandler;
const BuilderService = require("../Service/BuilderService");
const Promise       = require("bluebird");
const _             = require("lodash");
const codes         = require("../config/codes.json");
const config        = require("../config/serverconfig.json");

const createUser = (req, res) => {
    const serviceInst = BuilderService["user"];
    const body = req.body;
    return serviceHandler(req, res, serviceInst.createUser(body));
};

const getUsers = (req, res) => {
    const serviceInst = BuilderService["user"];
    const skip = req.query.skip;
    const limit = req.query.limit;
    return serviceHandler(req, res, serviceInst.getUsers(skip, limit));
};

const searchUser = (req, res) => {
    const serviceInst = BuilderService["user"];
    return serviceHandler(req, res, serviceInst.getUserName(req.params.name));
};

const updateUser = (req, res) => {
    const serviceInst = BuilderService["user"];
    return serviceHandler(req, res, serviceInst.updateUser(req.params.id, req.body));
};

const getExpiringUsers = (req, res) => {
    const serviceInst = BuilderService["user"];
    return serviceHandler(req, res, serviceInst.getExipringUser());
};

const sendNotification = (req, res) => {
    const serviceInst = BuilderService["user"];
    return serviceHandler(req, res, serviceInst.sendNotification(req.body));
};

const getBirthdayUsers = (req, res) => {
    const serviceInst = BuilderService["user"];
    return serviceHandler(req, res, serviceInst.getBirthdayUsers());
};

const renewSubscription = (req, res) => {
    const serviceInst = BuilderService["user"];
    return serviceHandler(req, res, serviceInst.renewSubscription(req.params.id, req.query.subscriptionId));
};

module.exports = (app) => {
    app.post("/laxmangym/admin/:adminId/users", (req, res) => createUser(req, res));
    app.get("/laxmangym/admin/:adminId/users", (req, res) => getUsers(req, res));
    app.put("/laxmangym/admin/:adminId/users/:id", (req, res) => updateUser(req, res));
    app.get("/laxmangym/admin/:adminId/users/search/:name", (req, res) => searchUser(req, res));
    app.get("/laxmangym/admin/:adminId/expiringusers", (req, res) => getExpiringUsers(req, res));
    app.post("/laxmangym/admin/:adminId/notifyusers", (req, res) => sendNotification(req, res));
    app.get("/laxmangym/admin/:adminId/birthdayusers", (req, res) => getBirthdayUsers(req, res));
    app.get("/laxmangym/admin/:adminId/users/:id/renewsubscription", (req, res) => renewSubscription(req, res));
};