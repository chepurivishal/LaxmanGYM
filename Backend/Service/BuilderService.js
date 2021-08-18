module.exports = {
    admin: require("./admin").getInst(),
    subscription: require("./subscription").getInst(),
    user: require("./user").getInst(),
};