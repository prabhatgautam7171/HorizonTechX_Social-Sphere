import express from "express";

const router = express.Router();

import {
  createPost,
  getPosts,
  likePost
} from "../controllers/postController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";


// protected route
router.post("/create", authMiddleware, upload.single("image"), createPost);
router.put("/like/:id", authMiddleware, likePost);

// public route
router.get("/", getPosts);

export default router;
