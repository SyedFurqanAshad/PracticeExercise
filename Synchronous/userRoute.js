const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/usersWithPosts/sync", async (req, res) => {
  let id = 1;
  const userWithPosts = [];

  while (id !== "undefined") {
    try {
      const user = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const posts = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${user.data.id}/posts`
      );
      userWithPosts.push({ ...user.data, posts: posts.data });
      id++;
    } catch (ex) {
      console.log("Error catch");
      id = "undefined";
    }
  }
  res.send(userWithPosts);
});

module.exports = router;
