//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');
const mongoose = require("mongoose");


const homeStartingContent = "Blogging refers to writing, photography, and other media that's self-published online. Blogging started as an opportunity for individuals to write diary-style entries, but it has since been incorporated into websites for many businesses. The hallmarks of blogging include frequent updates, informal language, and opportunities for readers to engage and start a conversation.The word blog is actually a shortened form of its original name, webpage These weblogs allowed early internet users to log the details of their day in diary-style entries. Blogs often allow readers to comment, so as they became more common, communities sprung up around popular blogs.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/postDB" , {useNewUrlParser: true});

const postSchema = {
  title : String,
  content : String
}

const Post = mongoose.model("Post",postSchema);

app.get("/posts/:postId", function(req, res) {

      const requestedTitle = req.params.postId;
      Post.findOne({_id : requestedTitle}, function(err,post){
        res.render("post" ,{
          varTitle : post.title ,
          varContent : post.content});
      });
      });


app.get("/", function(req, res) {
  Post.find({}, function(err,results){
    res.render("home", {
      varHome: homeStartingContent,
      arrPost: results
    });
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    varAbout: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    varContact: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = new Post ({
    title: req.body.myTitle,
    content: req.body.myPost
  });
  post.save(function(err){
    if(!err){
    res.redirect("/");
    }
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
