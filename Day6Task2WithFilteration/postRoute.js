var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/posts", async (req, res) => {
  let posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
  let comments = await axios.get(
    "https://jsonplaceholder.typicode.com/comments"
  );
  let specificPost = posts.data.filter(item => {
    return item.title === req.query.title;
  });
  let postArray = [];
  Array.isArray(specificPost) && specificPost.length
    ? (postArray = specificPost)
    : (postArray = posts.data);

  req.query.body &&
    (specificPost = postArray.filter(item => {
      return item.body == req.query.body;
      //   console.log(" \n \n Body \n \n", item.body);
    }));

  let array = [];
  if (!req.query.title && !req.query.body) array = posts.data;
  else array = specificPost;

  let postWithComments = array.map(item => {
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
