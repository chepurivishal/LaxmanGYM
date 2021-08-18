const jwt           = require("jsonwebtoken");
const ModelFactory  = require("../Model/ModelFactory");
const config        = require("../config/serverconfig.json");

const authorizeAdmin = (req, res, next) => {
    const adminId = req.params.adminId;
    const model  = ModelFactory.admin();
    return model.getAdminById(adminId)
    .then(admin => {
        let token = req.headers.authorization;
        if(!admin || !token) {
            res.status(401);
            res.send("InValidAccess");
        }
        jwt.verify(token, config.appserver.privateKey, (err, data) => {
            if(err || !data || data.adminId !== adminId) {
                res.status(403);
                res.send("InValidAccess");
            }
        });
        next();
    })
}

module.exports = app => {
    app.use("/laxmangym/admin/:adminId", (req, res, next) => authorizeAdmin(req, res, next));
};