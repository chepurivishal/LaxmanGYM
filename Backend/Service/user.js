const ModelFactory = require("../Model/ModelFactory");
const Promise      = require("bluebird");
const config       = require("../config/serverconfig.json");
const _            = require("lodash");
const utils        = require("../Utils/utilities");
const moment       = require("moment");
const { CostExplorer } = require("aws-sdk");
const request      = Promise.promisify(require("request"));

class UserService {
    constructor() {
        this.model = ModelFactory.user();
    }
}

UserService.prototype.createUser = function(data) {
    const subscriptionModel = ModelFactory.subscription();
    if(data) {
        var getSubscriptionP = Promise.resolve();
        if(data.subscription) {
            getSubscriptionP = subscriptionModel.getSubscriptionById(data.subscription);
            return getSubscriptionP
            .then(subscription => {
                switch(subscription.subscriptionPeriod) {
                    case "monthly":
                        data.startDate = new Date();
                        data.endDate = new Date(new Date().getTime() + (86400 * 1000 * 30));
                        break;
                    case "quarterly":
                        data.startDate = new Date();
                        data.endDate = new Date(new Date().getTime() + (86400 * 1000 * 90));
                        break;
                    case "halfyearly":
                        data.startDate = new Date();
                        data.endDate = new Date(new Date().getTime() + (86400 * 1000 * 180));
                        break;
                    case "annually":
                        data.startDate = new Date();
                        data.endDate = new Date(new Date().getTime() + (86400 * 1000 * 180));
                        break;

                }
                return this.model.createUser(data);
            });
        }
        return Promise.resolve({});
    }
};

UserService.prototype.updateUser = function(id, data) {
    return this.model.updateUserById(id, data);
};

UserService.prototype.getUsers = function(skip, limit) {
    return this.model.getUsers({}, {skip, limit});
};

UserService.prototype.getUserName = function(name) {
    return this.model.getUserByName(name);
};

UserService.prototype.deleteUser = function(id) {
    return this.model.deleteUser(id);
};

UserService.prototype.getExipringUser = function() {
    return this.model.getExpiringUsers();
};

const notifyUsers = (users, type) => {
    Promise.map(users, user => {
        let queryParams = config.sms.queryparams;
        queryParams.numbers = [user.phoneNumber];
        const uri = `${config.sms.uri}?${utils.getQueryString(queryParams)}`;
        const method = config.sms.method;
        switch(type) {
            case "1":
                queryParams.message = `Hi ${user.name} \nYour subcription at Laxman Fitness Studio is getting expired soon(${moment(user.endDate).format("ll")}). Please renew the subscription. Ignore if already renewed.\n\nThank you.\nStay Fit.`;
            case "2":
                queryParams.message = `Many More Happy Returns of the day ${user.name}. Laxman Fitness Studio wish you a Happy, Successful and Fit life Ahead.\n\nLaxman Fitness Studio.`
        }
        request({
            uri: uri,
            method: method
        }).then(res => {
            console.log("RES!!!!!!!!!       ", res.statusCode);
        });
    }, {concurrency: 1});
};

UserService.prototype.sendNotification = function(body) {
    const self = this;
    const userModel = ModelFactory.user();
    let phoneNumbers = [];
    return userModel.getUsersByIds(body.users)
    .then(users => {
        if(users && users.length) {
            notifyUsers(users, body.type);
        }
    })
};

UserService.prototype.getBirthdayUsers = function() {
    return this.model.find({})
    .then(users => {
        return _.compact(_.map(users, user => {
            if(new Date(user.DOB).getMonth() === new Date().getMonth() && new Date(user.DOB).getDate() === new Date().getDate()) {
                return user;
            }
        }));
    });
};

UserService.prototype.renewSubscription = function(id, subscriptionId) {
    const subscriptionModel = ModelFactory.subscription();
    return subscriptionModel.getSubscriptionById(subscriptionId)
    .then(subscription => {
        var data = {};
        if(subscription && subscription.subscriptionPeriod) {
            switch(subscription.subscriptionPeriod) {
                case "monthly":
                    data.startDate = new Date();
                    data.endDate = new Date(new Date().getTime() + (86400 * 1000 * 30));
                    break;
                case "quarterly":
                    data.startDate = new Date();
                    data.endDate = new Date(new Date().getTime() + (86400 * 1000 * 90));
                    break;
                case "halfyearly":
                    data.startDate = new Date();
                    data.endDate = new Date(new Date().getTime() + (86400 * 1000 * 180));
                    break;
                case "annually":
                    data.startDate = new Date();
                    data.endDate = new Date(new Date().getTime() + (86400 * 1000 * 180));
                    break;
            }
            return this.model.updateUserById(id, data);
        }
    })
}

module.exports = {
    getInst: () => new UserService()
};