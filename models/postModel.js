//modal is a blueprint of the database table structure or schema 
//that defines the shape of the table and the type of data that can be stored in the table.


const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
        validate: {
            validator: function (tags) {
                return tags && tags.length > 0;
            },
            message: 'A post must have at least one tag'
        }
    }],
    comments: [{
        user: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }], 
    likes: {
        type: Number,
        default: 0,
    },
    images: [{
        type: String,
    }],
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;