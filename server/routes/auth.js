const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

const bcrypt = require('bcryptjs');

//JWT
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');

const requireLogin = require('../middleware/requireLogin');

router.get('/', (req, res) => {
    res.send("Welcome to Nistagram...");
});

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        return res.status(422).json({ error: "not workink!!!...please fill all the Fields..." });
    }

    UserModel.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exist with this Email" });
            }
            //Hash Password
            bcrypt.hash(password, 15)
                .then(hashedpassword => {
                    const newUser = new UserModel({
                        email,
                        password: hashedpassword,
                        name
                    })

                    newUser.save()
                        .then(user => {
                            res.json({ message: "User Signup Successfully" });
                        })
                        .catch(err => {
                            console.log("Error Occured while Signup : " + err);
                        })
                });


        })
        .catch(err => {
            console.log("Error Occured : " + err);
        })
});

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "please write email and password" });
    }
    UserModel.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or Password" });
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({ message: "successfully signedin" })
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                        const { _id, name, email } = savedUser;
                        res.json({ token, user: { _id, name, email } });
                    } else {
                        return res.status(422).json({ error: "Invalid Email or Password" });
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
});

module.exports = router;