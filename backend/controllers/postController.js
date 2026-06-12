import Post from "../models/Post.js";
import mongoose from "mongoose";


// CREATE POST
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    console.log("Received content:", content);
    console.log("Received file:", req.file);

    if (!content?.trim() && !req.file) {
      return res.status(400).json({
        success: false,
        message: "Post cannot be empty",
      });
    }

    let mediaType = "";

    if (req.file) {
      mediaType = req.file.mimetype.startsWith("video")
        ? "video"
        : "image";
    }

    const post = await Post.create({
      user: req.user.id,
      content,
      media: req.file?.path || "",
      mediaType,
    });

    res.status(201).json({
      success: true,
      post,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL POSTS
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LIKE / UNLIKE POST
export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // check already liked
    const alreadyLiked = post.likes.includes(req.user.id);

    if (alreadyLiked) {
      // unlike
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user.id
      );

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post unliked",
      });
    }

    // like
    post.likes.push(req.user.id);

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post liked",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
