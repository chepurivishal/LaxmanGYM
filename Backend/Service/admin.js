const ModelFactory = require("../Model/ModelFactory");
const Promise      = require("bluebird");
const jwt          = require("jsonwebtoken");
const config       = require("../config/serverconfig.json");
const _            = require("lodash");


class AdminService {
    constructor() {
        this.model = ModelFactory.admin();
    }
};

AdminService.prototype.login = function(username, password) {
    if(!username || !password) return Promise.reject("MISSING_LOGIN_DETAILS");
    return this.model.getAdminByUsernameAndPassword(username, password)
    .then(admin => {
        if(_.isEmpty(admin)) {
            return Promise.reject("LOGIN_FAILED");
        }
        const token = jwt.sign({adminId: admin._id}, config.appserver.privateKey);
        return {
            token, admin
        }
    });
};

AdminService.prototype.createAdmin = function (username, password) {
    return this.model.createAdmin(username, password);
};

module.exports = {
    getInst: () => new AdminService(),
};