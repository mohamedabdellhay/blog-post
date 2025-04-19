const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const DeletedPost = require("../models/DeletedPost");

router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});
router.get("/:id", async (req, res) => {
  const post = await Post.find({ id: req.params.id });
  res.json(post);
});
router.post("/", async (req, res) => {
  console.log(req.body);
  const newPost = new Post(req.body);
  await newPost.save();
  res.status(201).json(newPost);
});

router.put("/:id", async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedPost);
});

router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

router.delete("/move-to-trash/:id", async (req, res) => {
  const deletedPost = await Post.findOneAndUpdate(
    { id: req.params.id },
    { $set: { deleted: true } },
    { new: true }
  );
  console.log(deletedPost);
  if (!deletedPost) {
    return res.status(404).json({ message: "Post not found" });
  }
  // const postToBeDeleted = deletedPosts
  // const deletedPost = new DeletedPost(deletedPosts);
  // deletedPost.deletedAt = new Date(); // Set the deletion date
  // deletedPost.deletedBy = req.user._id; // Set the user who deleted the post
  // console.log(deletedPost);
  // await deletedPost.save();
  res.status(201).json(deletedPost);
});

router.get("/trash", async (req, res) => {
  const deletedPosts = await DeletedPost.find().sort({ date: -1 });
  if (!deletedPosts) {
    return res.status(404).json({ message: "No deleted posts found" });
  }
  res.json(deletedPosts);
});

module.exports = router;
