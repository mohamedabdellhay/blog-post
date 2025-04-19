const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  const numberOfArticles = await Post.countDocuments();
  const recentPosts = await Post.find(
    {},
    { id: 1, title: 1, content: 1, createdAt: 1, updatedAt: 1 }
  )
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("author", "username");
  //   {post.title}
  //   {post.content}
  //   {post.createdAt}
  res.json({
    message: "Welcome to the home page!",
    numberOfArticles,
    recentPosts,
  });
});

module.exports = router;
