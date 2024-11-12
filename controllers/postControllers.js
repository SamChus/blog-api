


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

];

app.get("/", (req, res) =>{
    res.send(post);
})

app.get("/posts/:id", (req, res) =>{
    const id = req.params.id;

    const posts = post.find((p) => p.id === parseInt(id));

    if(posts) {
        res.status(200).send({
            message: "Post retrieved successfully",
            data: post,
            date: new Date().toLocaleTimeString(),
        });
    }else{
        res.status(404).send({
            message: "Oops we couldn't find the post you are looking for!"
        });
    }
})


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