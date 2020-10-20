const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/usersWithPosts/async", async (req, res) => {
  const users = await axios.get("https://jsonplaceholder.typicode.com/users");
  const userWithPosts = users.data.map(async user => {
    const posts = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${user.id}/posts`
    );
    return {
      ...user,
      posts: posts.data
    };
  });
  res.send(await Promise.all(userWithPosts));
});

module.exports = router;
