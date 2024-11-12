const {validatePost} = require("../utils/validation")



const post = [
    {
        id: 1,
        title: 'Post 1',
        content: 'This is the first post'
    },
    {
        id: 2,
        title: 'Post 2',
        content: 'This is the second post'
    },
    {
        id: 3,
        title: 'Post 3',
        content: 'This is the third post'
    },
  {
        id: 4,
        title: 'Post 4',
        content: 'This is the fourth port'
    },
  {
        id: 5,
        title: 'Post 5',
        content: 'This is the fifth post'
    },
    {
        id: 6,
        title: 'Post 6',
        content: 'This is the sixth post'
    }

]

const createPost = async (req, res) => {

    const {error} = validatePost(res.body)
    if (error) {
        return res.status(400).send({
            message: error.details[0].message,
        })
    }
    const {title, content} = req.body;
    const newPost = {
        id: post.length + 1,
        title,
        content,
    };
    post.push(newPost);
    res.status(201).send({
            message: "Post added successfully",
            data: newPost,
            date: new Date().toLocaleTimeString(),
        });
}

const deletePost = async (req, res) => {
    const postId = req.params.id;
    const postIndex = await post.findIndex((post) => post.id == postId);
    if (postIndex > -1) {
        post.splice(postIndex, 1);
        res.send('Post deleted');
    } else {
        res.send('Post not found');
    }
}


const updatePost = (req, res) => {
        const id = parseInt(req.params.id);
        const {title, content} = req.body;

        const item = post.find((item) => item.id === id);

        if (item) {
            item.title = title;
            item.content = content;

            res.status(200).send({
                message: "item updated successfully",
                data: item,
                date: new Date().toLocaleTimeString(),
            })
        }else {
            res.status(404).send({
                message: "item not found"
            })
        }
    }
module.exports = {
    createPost,
    deletePost,
    updatePost
}
