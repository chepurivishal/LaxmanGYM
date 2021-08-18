const BaseModel = require("./BaseModel");

class AdminModel extends BaseModel {
    constructor() {
        super();
    }
}

AdminModel.prototype.getAdminById = function(adminId) {
    let query = {_id: adminId};
    return this.findOne(query);
};

AdminModel.prototype.getAdminByUsernameAndPassword = function(username, password) {
    let query = {username, password};
    return this.findOne(query);
};

AdminModel.prototype.createAdmin = function(username, password) {
    let body = {
        username, password
    };
    return this.create(body);
};

module.exports = {
    getInst: () => new AdminModel()
};