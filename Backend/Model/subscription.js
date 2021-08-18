const Subscription = require("../DBSchema/Subscription");
const BaseModel = require("./BaseModel");

class SubscriptionModel extends BaseModel {
    constructor() {
        super();
    }
}

SubscriptionModel.prototype.createSubscription = function(data) {
    return this.create(data);
};

SubscriptionModel.prototype.getSubscriptions = function() {
    return this.find({});
};

SubscriptionModel.prototype.getSubscriptionById = function(id) {
    const query = {_id: id};
    return this.findOne(query);
};

SubscriptionModel.prototype.updateSubscription = function(id, data) {
    const query = {_id: id};

    return this.findOneAndUpdate(query, data);
};

SubscriptionModel.prototype.deleteSubscription = function(id) {
    return this.delete(id)
};

module.exports = {
    getInst: () => new SubscriptionModel()
};