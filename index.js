const express = require("express");
const mongoose = require("mongoose");

const logger = require("./middlewares/logger");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const Post = require("./models/postModel");

const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/blog")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

  //This is how to create a new post
  // const createPost = async () => {
  //   const newPost = new Post({
  //     title: "My Third Post",
  //     content: "This is my third post",
  //   });
  //   const result = await newPost.save()
  //   console.log(result)
  // }

  // createPost()

  //This is how to get all posts
  // const getPosts = async () => {
  //   const posts = await Post.find({})
  //   console.log(posts)
  // }

  // getPosts()

  //This is how to get a single post by ID
  // const getPost = async (id) => {
  //   const post = await Post.findById(id)
  //   console.log(post)
  // }

  // getPost("673877717ad6a67591e9dddc");

  //This is how to find a post by title
  // const getPostByTitle = async (title) => {
  //   const post = await Post.find(
  //     {title: { $regex: title, $options: "i" }}
  //   )
  //   console.log(post)
  // }
  
  // getPostByTitle("se");

  //This is how to find a post by title and content [without case sensitive]
  // const getPostByTitleAndContent = async (keyword) =>{
  //   const post = await Post.find({
  //     $or: [
  //       { title: { $regex: keyword, $options: "i" } },
  //       { content: { $regex: keyword, $options: "i" } },
  //     ],
  //   });
  //   console.log(post)
  // }

  // getPostByTitleAndContent("av");

  //This is how to update a post by ID
  // const updatePost = async (id) => {
  //   const post = await Post.findByIdAndUpdate(id, {
  //     title: "My First Post",
  //     content: "This is my first post",
  //   }, {new: true})
  //   console.log(post)
  // }
  // updatePost("673877717ad6a67591e9dddc");

  //This is how to update a post by title
// const updatePostByTitle = async (title) => {
//   const updatePost = await Post.updateOne(
//     {title}, 
//     {$set: {title: "Post 1st"}}
//   )
//   console.log(updatePost);
  
// }

// updatePostByTitle("My First Post");


//This is how to delete a post
// const deletePostById = async (id) => {
//   const deletedPost = await Post.findByIdAndDelete(id)
//   console.log(deletedPost)
// }

// deletePostById("673878534ac9abf30239f4a8");


// const deleteAllPost = async () => {
//   const post = await Post.deleteMany({})
//   console.log(post);
  
// }

// deleteAllPost()




//Pure Function  - Are functions that uses parameters and return a result


  // const createPost = async (title, content) => {
  //   const newPost = new Post({
  //     title,
  //     content
  //   });
  //   const result = await newPost.save()
  //   console.log(result)
  // }

  // createPost(
  //   "Second Post Of Pure Func",
  //   "Pure Function  - Are functions that uses parameters and return a result"
  // );



  
  //This is how to get limited posts
  const getLimitedPosts = async (limit) => {
    const posts = await Post.find({}).limit(limit)
    console.log(posts)
  }

  getLimitedPosts(3)



  














const app = express();

app.use(express.json());
app.use(logger);

app.use("/api", userRoutes);
app.use("/api/post", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
