
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "";
const aboutContent = "einfach nur ein text mit vielen wirren worten für den anfang geschrieben um zu sehen das es alles anzeigt was ich will - und wenn nich ist natürlcih der Computer schuld und nicht ich, das ist ja ganz klar; also auf in den ... was auch immer witz joke lustig, written by ingobritzen";
const contactContent = "einfach nur ein text mit vielen wirren worten für den anfang geschrieben um zu sehen das es alles anzeigt was ich will - und wenn nich ist natürlcih der Computer schuld und nicht ich, das ist ja ganz klar; also auf in den ... was auch immer witz joke lustig, written by ingobritzen";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Ingo888:in7774goTo@cluster0.9kr2o.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res) {

  Post.find({}, function(err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {

  const post = new Post({
    title: req.body.blogTitle,
    content: req.body.blogBody
  });

  post.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });

});

app.get("/posts/:postId", function(req, res) {

  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

  // posts.forEach(function(post) {
  //   const storedTitle = _.lowerCase(post.title);

  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content
  //     });
  //   }
  // });

});

// app.get("/", function(req, res) {
//   res.render("home", {startingContent: homeStartingContent, 
//   posts: posts});
// });

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});




app.listen(8080, function() {
  console.log("Server started on port 8080");
});
