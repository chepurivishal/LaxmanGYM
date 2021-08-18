module.exports = {
    "admin": () => {
        const ModelInstance = require("./admin").getInst();
        ModelInstance.model = require("../DBSchema/admin");
        ModelInstance.modelName = "admin";
        return ModelInstance;
    },
    "subscription": () => {
        const ModelInstance = require("./subscription").getInst();
        ModelInstance.model = require("../DBSchema/Subscription");
        ModelInstance.modelName = "subscription";
        return ModelInstance;
    },
    "user": () => {
        const ModelInstance = require("./user").getInst();
        ModelInstance.model = require("../DBSchema/user");
        ModelInstance.modelName = "user";
        return ModelInstance;
    }
};