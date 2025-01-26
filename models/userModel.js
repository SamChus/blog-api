const jwt = require('jsonwebtoken');


const mongoose = require('mongoose');
const Post = require('./postModel');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [
        Post.schema // Embedding a document (Denormalization) - FOR QUERY PERFORMANCE
    ],
    isAdmin: Boolean,
    profilePicture: String        
}, {timestamps: true});

//Generate token
userSchema.methods.generateToken = function () {
    const token = jwt.sign({id: this._id, admin: this.isAdmin}, process.env.JWT_SECRET);
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;