const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

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
        require: true
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
});

mongoose.model("Post", postSchema);