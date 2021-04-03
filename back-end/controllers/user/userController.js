const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    let { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(422).json({
                error: "please fill all fields"
            });
        }

        await userModel.findOne({ email: email })
            .then((savedUser) => {
                if (savedUser) {
                    return res.status(404).json({
                        error: "User already exists with this email"
                    })
                } else {

                    const hashedPassword = bcrypt.hashSync(password, 6)

                    const newUser = new userModel({
                        name,
                        email,
                        password: hashedPassword
                    });

                    newUser.save()
                        .then(userData => {
                            return res.status(200).json({
                                message: "User registered successfully",
                                data: userData
                            })
                        })
                        .catch(err => {
                            throw err;
                        })
                }
            })
            .catch(err => {
                throw err;
            })
    } catch (err) {
        return res.status(400).json({
            message: "failed to proceed request",
            err
        });
    }
}

const signin = async (req, res) => {
    let { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(422).json({
                error: "please fill all fields"
            });
        }

        await userModel.findOne({ email: email })
            .then((savedUser) => {
                if (savedUser) {
                    return res.status(404).json({
                        error: "User already exists with this email"
                    })
                } else {

                    const hashedPassword = bcrypt.hashSync(password, 6)

                    const newUser = new userModel({
                        name,
                        email,
                        password: hashedPassword
                    });

                    newUser.save()
                        .then(userData => {
                            return res.status(200).json({
                                message: "User registered successfully",
                                data: userData
                            })
                        })
                        .catch(err => {
                            throw err;
                        })
                }
            })
            .catch(err => {
                throw err;
            })
    } catch (err) {
        return res.status(400).json({
            message: "failed to proceed request",
            err
        });
    }
}

module.exports = { signup, signin };