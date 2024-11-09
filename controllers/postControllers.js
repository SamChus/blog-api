


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
        id: 5,
        title: 'Post 5',
        content: 'This is the fifth post'
    }
]

const createPost = async (req, res) => {
    res.send('Hello New Post');
}