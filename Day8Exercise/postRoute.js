var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/posts", async (req, res) => {
  let posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
  let comments = await axios.get(
    "https://jsonplaceholder.typicode.com/comments"
  );

  let user = parseInt(req.query.user);
  let deleteUser = posts.data.filter(del => del.userId != user);

  let postWithComments = deleteUser.map(item => {
    let filterComments = comments.data.filter(m => m.postId === item.id);

    return {
      ...item,
      comments: filterComments
    };
  });

  const sortingByTitle = (a, b) => a.title.localeCompare(b.title);
  const sortingByBody = (a, b) => a.body.localeCompare(b.body);

  if ((req.query.sort == 1 || req.query.sort == -1) && req.query.title) {
    postWithComments.sort(sortingByTitle);
    req.query.sort == -1 ? postWithComments.reverse() : null;
  }

  if ((req.query.sort == 1 || req.query.sort == -1) && req.query.body) {
    postWithComments.sort(sortingByBody);
    req.query.sort == -1 ? postWithComments.reverse() : null;
  }

  res.send(postWithComments);
});

module.exports = router;
