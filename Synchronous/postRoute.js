const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/postWithComments/sync", async (req, res) => {
  let postId = 1;
  const postWithComments = [];
  while (postId !== "undefined") {
    try {
      const post = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const comments = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${post.data.id}/comments`
      );
      postWithComments.push({ ...post.data, comments: comments.data });
      postId++;
    } catch (ex) {
      console.log("Error catch");
      postId = "undefined";
    }
  }
  res.send(postWithComments);
});

module.exports = router;
