//modal is a blueprint of the database table structure or schema 
//that defines the shape of the table and the type of data that can be stored in the table.


const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;