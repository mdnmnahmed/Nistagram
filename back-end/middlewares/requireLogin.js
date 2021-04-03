const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


module.exports = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            error: 'Unauthorize User, please login first'
        })
    }

    const token = authorization.replace("bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({
                error: 'Unauthorize User, please login first'
            })
        }

        const { _id } = payload;
        const userData = userModel.findById(_id);
        req.user = userData;

        next();
    })
}