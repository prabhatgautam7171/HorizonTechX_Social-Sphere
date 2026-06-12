import express from "express";

const router = express.Router();

import authMiddleware from "../middleware/authMiddleware.js";

import {
  followUser,
  getUserProfile,
} from "../controllers/userController.js";


// follow/unfollow
router.put(
  "/follow/:id",
  authMiddleware,
  followUser
);


// get profile
router.get("/:id", getUserProfile);

export default router;
