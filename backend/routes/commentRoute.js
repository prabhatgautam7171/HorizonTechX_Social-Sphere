import express from "express";

const router = express.Router();

import authMiddleware from "../middleware/authMiddleware.js";

import {
  addComment,
  getComments,
} from "../controllers/commentController.js";


// add comment
router.post(
  "/:postId",
  authMiddleware,
  addComment
);

// get comments
router.get("/:postId", getComments);

export default router;
