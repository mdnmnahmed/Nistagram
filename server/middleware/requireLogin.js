const { request } = require("express")
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const mongoose = require('mongoose');
const UserModel = mongoose.model("User");



module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "tou must loggedin first" });
    }
    const token = authorization.replace("namun ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be loggedin first" });
        }
        const { _id } = payload;

        UserModel.findById(_id)
            .then(userdata => {
                req.user = userdata;
                next();
            });
    });
}