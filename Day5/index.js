var express = require("express");
var app = express();
var user = require("./userRoute");
var post = require("./postRoute");
var comment = require("./commentRoute");
var specificComment = require("./specificComment");
var photos = require("./photosRoute");

app.use("/users", user);
app.use("/posts", post);
app.use("/comments", comment);
app.use("/", specificComment);
app.use("/photos", photos);

app.listen(3000, () => console.log("Listenin on Port 3000"));
