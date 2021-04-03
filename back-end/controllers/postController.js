const PostModel = require('../models/postModel');

/**
 * Create new Post
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createPost = async (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(422).json({
            error: "Please fill all fields"
        })
    }

    req.user.password = undefined;
    req.user.created_date = undefined;

    const newPost = new PostModel({
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


/**
 * All Posts
*/
const allPosts = (req, res) => {
    PostModel.find()
        .populate("postedBy", "_id name")
        .then(allPosts => {
            return res.status(200).json({
                data: allPosts
            })
        })
        .catch(error => {
            return res.status(401).json({
                error
            })
        })
}


module.exports = { createPost, allPosts, userProfilePosts };