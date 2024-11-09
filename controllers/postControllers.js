const validatePost = require("/.utils/validation")


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
    }

]

const createPost = async (req, res) => {

    const {error} = validatePost(req.body);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message,
        })
    }
    const {title, content} = req.body;
    const newPost = {
        id: list.length + 1,
        title,
        content,
    };
    list.push(newPost);
    res.status(201).json(newPost);

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