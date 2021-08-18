const Promise = require("bluebird");
const generateId = require("../Utils/generateId");

class BaseModel {

    create(data) {
        if(!data._id) {
            data._id = generateId(this.modelName);
        }
        return this.model(data).save();
    }
    
    findOne(query, proj, opts) {
        return this.model.findOne(query, proj, opts)
            .then((rec) => {
                if(rec) rec = rec.toObject(rec);
                else rec = {};
                return Promise.resolve(rec);
            });
    }

    find(query, proj, opts) {
        let findP = this.model.find(query, proj);
        console.log("QUERY!!!!!!!          ", query, proj, opts);
        if(opts) {
            if(opts.sort) findP = findP.sort(opts.sort);
            if(opts.skip) findP = findP.skip(opts.skip);
            if(opts.limit) findP = findP.limit(opts.limit);
        }
        return findP
            .then((recs) => {
                return Promise.map(recs, (rec) => {
                    return Promise.resolve(rec.toObject(rec));
                });
            });
    }

    findOneAndUpdate(query, update, unset, options) {
        let updateSet = {
            "$set": {},
            "$unset": {} 
        };
        let opts = options || {};
        if(update) updateSet["$set"] = update;
        if(unset) updateSet["$unset"] = unset;
        return this.model.findOneAndUpdate(query, updateSet, opts);
    }

    delete(id) {
        return this.model.findByIdAndRemove({_id: id});
    }
}

module.exports = BaseModel;