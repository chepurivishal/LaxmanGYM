const ModelFactory = require("../Model/ModelFactory");
const Promise      = require("bluebird");
const jwt          = require("jsonwebtoken");
const config       = require("../config/serverconfig.json");
const _            = require("lodash");

class SubscriptionService {
    constructor() {
        this.model = ModelFactory.subscription();
    }
}

SubscriptionService.prototype.createSubscription = function(data) {
    var body = {};
    if(data) {
        if(data.name) body.name = data.name;
        if(data.subscriptionPeriod) body.subscriptionPeriod = data.subscriptionPeriod;
        if(data.subscriptionAmount) body.subscriptionAmount = data.subscriptionAmount;
        return this.model.createSubscription(body);
    };
    return Promise.resolve({});
};

SubscriptionService.prototype.getSubscriptions = function() {
    return this.model.getSubscriptions();
};

SubscriptionService.prototype.getSubscription = function(id) {
    return this.model.getSubscriptionById(id);
};

SubscriptionService.prototype.updateSubscription = function(id, data) {
    var body = {};
    if(data) {
        if(data.name) body.name = data;
        if(data.subscriptionPeriod) body.subscriptionPeriod = data.subscriptionPeriod;
        if(data.subscriptionAmount) body.subscriptionAmount = data.subscriptionAmount;
        return this.model.updateSubscription(id, body);
    };
};

SubscriptionService.prototype.deleteSubscription = function(id) {
    return this.model.deleteSubscription(id);
};

module.exports = {
    getInst: () => new SubscriptionService()
};