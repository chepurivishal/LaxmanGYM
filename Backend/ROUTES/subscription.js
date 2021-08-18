const serviceHandler = require("../Utils/servicehandler").serviceHandler;
const BuilderService = require("../Service/BuilderService");
const Promise       = require("bluebird");
const _             = require("lodash");
const codes         = require("../config/codes.json");
const config        = require("../config/serverconfig.json");

const createSubscription = (req, res) => {
    const serviceInst = BuilderService['subscription'];
    return serviceHandler(req, res, serviceInst.createSubscription(req.body));
};

const getSubscriptions = (req, res) => {
    const serviceInst = BuilderService['subscription'];
    return serviceHandler(req, res, serviceInst.getSubscriptions());
};

const getSubscription = (req, res) => {
    const serviceInst = BuilderService['subscription'];
    return serviceHandler(req, res, serviceInst.getSubscription(req.params.id));
};  

const updateSubscription = (req, res) => {
    const serviceInst = BuilderService['subscription'];
    return serviceHandler(req, res, serviceInst.updateSubscription(req.params.id, req.body));
};

const deleteSubscription = (req, res) => {
    const serviceInst = BuilderService['subscription'];
    return serviceHandler(req, res, serviceInst.deleteSubscription(req.params.id));
};

module.exports = app => {
    app.post("/laxmangym/admin/:adminId/subscriptions", (req, res) => createSubscription(req, res));
    app.get("/laxmangym/admin/:adminId/subscriptions", (req, res) => getSubscriptions(req, res));
    app.get("/laxmangym/admin/:adminId/subscriptions/:id", (req, res) => getSubscription(req, res));
    app.put("/laxmangym/admin/:adminId/subscriptions/:id", (req, res) => updateSubscription(req, res));
    app.delete("/laxmangym/admin/:adminId/subscriptions/:id", (req, res) => deleteSubscription(req, res));
};