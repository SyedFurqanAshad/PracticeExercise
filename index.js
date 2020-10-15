var express = require("express");
var app = express();
var user = require("./userRoute");
var post = require("./postRoute");
var comment = require("./commentRoute");
var photos = require("./photos");
var specificComment = require("./specificComment");

// app.use(express.json());
app.use("/users", user);
app.use("/posts", post);
app.use("/comments", comment);
app.use("/photos", photos);

app.use("/", specificComment);

app.listen(3000, () => console.log("Listenin on Port 3000"));
