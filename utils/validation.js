const Joi = require('joi');

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    
    return schema.validate(user);
    }


function validatePost (post) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        content: Joi.string().min(6).required(),
    });
    
    return schema.validate(post);
    }

// module.exports = { validateUser, validatePost }

module.exports = {
    validateUser: validateUser,
    validatePost: validatePost,
}