const postModel = require('../models/postModel');

const createPost = async (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(422).json({
            error: "Please fill all fields"
        })
    }

    req.user.password = undefined;
    req.user.created_date = undefined;

    const newPost = new postModel({
        title,
        body,
        postedBy: req.user
    });

    const savedData = await newPost.save()
        .catch(err => {
            return res.status(422).json({
                error: "failed to create post " + err
            })
        })

    return res.status(201).json({
        data: savedData,
    })
}

module.exports = { createPost };