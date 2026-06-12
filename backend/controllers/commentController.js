import Comment from "../models/Comment.js";


// ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const comment = await Comment.create({
      user: req.user.id,
      post: req.params.postId,
      text,
    });

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET COMMENTS OF POST
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
