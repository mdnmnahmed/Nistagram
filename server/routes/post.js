const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

//Creating Post Model
const postModel = mongoose.model('Post')

const requireLogin = require('../middleware/requireLogin');

router.get('/allpost', (req, res) => {
    postModel.find()
        .populate("postedBy", "_id name")
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            console.log(err);
        })
});

router.post('/createpost', requireLogin, (req, res) => {
    const { title, body, pic } = req.body;
    if (!title || !body || !pic) {
        return res.status(422).json({ error: "please add all fields" });
    }

    req.user.password = undefined;

    const postData = new postModel({
        title,
        body,
        pic,
        postedBy: req.user
    }); 

    postData.save()
        .then(result => {
            res.json({ post: result })
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/mypost', requireLogin, (req, res) => {
    postModel.find({postedBy: req.user._id})
        .populate("postedBy", "_id name")
        .then(mypost => {
            res.json({mypost})
        })
        .catch( err => {
            console.log('err')
        })
});

module.exports = router;