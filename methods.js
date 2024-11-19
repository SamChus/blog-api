// Get all posts
Post.getAllPosts = async function () {
  return await Post.find({});
};

// Get post by ID
Post.getPostById = async function (id) {
  return await Post.findById(id);
};

// Create a new post
Post.createPost = async function (postData) {
  const post = new Post(postData);
  return await post.save();
};

// Update a post by ID
Post.updatePostById = async function (id, updateData) {
  return await Post.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a post by ID
Post.deletePostById = async function (id) {
  return await Post.findByIdAndDelete(id);
};

// Delete all posts
Post.deleteAllPosts = async function () {
  return await Post.deleteMany({});
};

// Get all posts that contain a specific keyword in the title
Post.getPostByTitle = async function (title) {
  return await Post.find({ title: { $regex: title, $options: "i" } });
};

// Get all posts that contain a specific keyword in the content
Post.getPostByContent = async function (content) {
  return await Post.find({ content: { $regex: content, $options: "i" } });
};

// Get all posts that contain a specific keyword in the title or content
Post.getPostByKeyword = async function (keyword) {
  return await Post.find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { content: { $regex: keyword, $options: "i" } },
    ],
  });
};

//regex - regular expression or pattern matching or search string 
//regression expression is also called regex or regexp
//i - case insensitive search

// Get all posts that contain a specific keyword in the title and content
Post.getPostByTitleAndContent = async function (title, content) {
  return await Post.find({
    title: { $regex: title, $options: "i" },
    content: { $regex: content, $options: "i" },
  });
};

// Get a limited number of posts
Post.getLimitedPosts = async function (limit) {
  return await Post.find({}).limit(limit);
};

// Get posts with a specific field set to a value
Post.getPostsByField = async function (field, value) {
  let query = {};
  query[field] = value;
  return await Post.find(query);
};

// Get posts with a field value greater than a specific value
Post.getPostsByFieldGreaterThan = async function (field, value) {
  let query = {};
  query[field] = { $gt: value };
  return await Post.find(query);
};

// Get posts with a field value less than a specific value
Post.getPostsByFieldLessThan = async function (field, value) {
  let query = {};
  query[field] = { $lt: value };
  return await Post.find(query);
};

// Get posts with a field value between two values
Post.getPostsByFieldBetween = async function (field, minValue, maxValue) {
  let query = {};
  query[field] = { $gte: minValue, $lte: maxValue };
  return await Post.find(query);
};



// Get posts sorted by a specific field
Post.getPostsSortedByField = async function (field, order = 'asc') {
    let sortOrder = order === 'asc' ? 1 : -1;
    let sortQuery = {};
    sortQuery[field] = sortOrder;
    return await Post.find({}).sort(sortQuery);
};