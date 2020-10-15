var express = require("express");
var router = express.Router();
const axios = require("axios");

router.get("/posts/:id/comments", (req, res) => {
  //   res.send("Specific comment");
  //   console.log(req.params.id);
  axios
    .get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}/comments`)
    .then(response => {
      try {
        //   res.send(response.data);
        res.send(response.data);
        //   console.log(response.data);
      } catch (ex) {
        console.log(ex);
      }
    });
});

module.exports = router;
