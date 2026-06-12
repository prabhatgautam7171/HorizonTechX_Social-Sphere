import {User} from "../models/User.js";
import Post from "../models/Post.js";

// FOLLOW / UNFOLLOW USER
export const followUser = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const targetUserId = req.params.id;

    // cannot follow self
    if (currentUserId === targetUserId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const currentUser = await User.findById(
      currentUserId
    );

    const targetUser = await User.findById(
      targetUserId
    );

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // already following
    const isFollowing =
      currentUser.following.includes(targetUserId);

    if (isFollowing) {
      // unfollow
      currentUser.following =
        currentUser.following.filter(
          (id) => id.toString() !== targetUserId
        );

      targetUser.followers =
        targetUser.followers.filter(
          (id) => id.toString() !== currentUserId
        );

      await currentUser.save();
      await targetUser.save();

      return res.status(200).json({
        success: true,
        message: "User unfollowed",
      });
    }

    // follow
    currentUser.following.push(targetUserId);

    targetUser.followers.push(currentUserId);

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      success: true,
      message: "User followed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // get user posts
    const posts = await Post.find({
      user: req.params.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      user,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


