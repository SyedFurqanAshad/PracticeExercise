var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  let posts = await axios.get("https://jsonplaceholder.typicode.com/posts");

  let comments = await axios.get(
    "https://jsonplaceholder.typicode.com/comments"
  );

  // let postWithComments = [];

  let postWithComments = posts.data.map(item => {
    let filterComments = comments.data.filter(m => m.postId === item.id);

    return {
      id: item.id,
      title: item.title,
      body: item.body,
      comments: filterComments
    };
  });
  res.send(postWithComments);
});

module.exports = router;
