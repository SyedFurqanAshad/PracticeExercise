var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/users", async (req, res) => {
  let users = await axios.get("https://jsonplaceholder.typicode.com/users");
  let specificUser = users.data.filter(item => {
    return item.address.zipcode === req.query.zip;
  });

  let posts = await axios.get("https://jsonplaceholder.typicode.com/posts");

  let comments = await axios.get(
    "https://jsonplaceholder.typicode.com/comments"
  );

  let array = [];
  if (!req.query.zip) array = users.data;
  else array = specificUser;

  let userWithPost = array.map(item => {
    let filterPosts = posts.data.filter(m => m.userId === item.id);

    let filterPostWithComments = filterPosts.map(post => {
      return {
        ...post,
        comments: [...comments.data.filter(com => com.postId === post.id)]
      };
    });

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
