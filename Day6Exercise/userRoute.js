var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  let users = await axios.get("https://jsonplaceholder.typicode.com/users");

  let posts = await axios.get("https://jsonplaceholder.typicode.com/posts");

  let comments = await axios.get(
    "https://jsonplaceholder.typicode.com/comments"
  );
  // console.log("COmments", comments.data);

  let userWithPost = users.data.map(item => {
    let filterPosts = posts.data.filter(m => m.userId === item.id);

    let filterPostWithComments = filterPosts.map(post => {
      return {
        ...post,
        comments: [...comments.data.filter(com => com.postId === post.id)]
      };
    });
    // console.log(filterPostWithComments);
    return {
      id: item.id,
      name: item.name,
      username: item.username,
      address: item.address,
      posts: filterPostWithComments
    };
  });
  res.send(userWithPost);
});

module.exports = router;
