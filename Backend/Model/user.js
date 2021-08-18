const BaseModel = require("./BaseModel");

class UserModel extends BaseModel {
    constructor() {
        super();
    }
}

UserModel.prototype.createUser = function(data) {
    var body = {};
    if(data.date) body.date = data.date;
    if(data.name) body.name = data.name;
    if(data.address) body.address = data.address;
    if(data.pincode) body.pincode = data.pincode;
    if(data.phoneNumber) body.phoneNumber = data.phoneNumber;
    if(data.email) body.email = data.email;
    if(data.DOB) body.DOB = data.DOB;
    if(data.maritalStatus) body.maritalStatus = data.maritalStatus;
    if(data.gender) body.gender = data.gender;
    if(data.subscription) body.subscription = data.subscription;
    if(data.medicalHistory) body.medicalHistory = data.medicalHistory;
    if(data.startDate) body.startDate = data.startDate;
    if(data.endDate) body.endDate = data.endDate;
    if(data.profilePic) body.profilePic = data.profilePic;
    if(data.physician) body.physician = data.physician;
    if(data.emergencyContact) body.emergencyContact = data.emergencyContact;
    return this.create(body);
};

UserModel.prototype.updateUserById = function(id, data) {
    var body = {};
    if(data.date) body.date = data.date;
    if(data.name) body.name = data.name;
    if(data.address) body.address = data.address;
    if(data.pincode) body.pincode = data.pincode;
    if(data.phoneNumber) body.phoneNumber = data.phoneNumber;
    if(data.email) body.email = data.email;
    if(data.DOB) body.DOB = data.DOB;
    if(data.maritalStatus) body.maritalStatus = data.maritalStatus;
    if(data.gender) body.gender = data.gender;
    if(data.subscription) body.subscription = data.subscription;
    if(data.medicalHistory) body.medicalHistory = data.medicalHistory;
    if(data.startDate) body.startDate = data.startDate;
    if(data.endDate) body.endDate = data.endDate;
    if(data.profilePic) body.profilePic = data.profilePic;
    if(data.physician) body.physician = data.physician;
    if(data.emergencyContact) body.emergencyContact = data.emergencyContact;
    return this.findOneAndUpdate({_id: id}, body);

}

UserModel.prototype.getUsers = function(query, opts) {
    if(opts) {
        if(opts.skip) opts.skip = parseInt(opts.skip, 10);
        if(opts.limit) opts.limit = parseInt(opts.limit, 10); 
    }
    return this.find(query, {}, opts);
};

UserModel.prototype.getUserByName = function(name) {
    var query = {
        name: {
            "$regex": name
        }
    };
    return this.find(query);
};

UserModel.prototype.deleteUser = function(id) {
    return this.delete({_id: id});
};

UserModel.prototype.getExpiringUsers = function() {
    var date1 = new Date();
    var date2 = new Date(new Date().getTime() + (86400 * 1000 * 7));

    var query = {
        endDate: {
            $gte: date1,
            $lte: date2
        }
    };

    return this.find(query);
};

UserModel.prototype.getUsersByIds = function(ids) {
    var query = {
        _id: {
            "$in": ids
        }
    };
    return this.find(query);
};

module.exports = {
    getInst: () => new UserModel()
};