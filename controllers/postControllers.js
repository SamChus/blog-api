


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
    }
]



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