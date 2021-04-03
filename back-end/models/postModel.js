const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    photo: {
        type: String,
        default: ''
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created_date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Post", postSchema);