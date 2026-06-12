import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";

function PostCard({ post, handleLike }) {

  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    try {
      const res = await API.get(
        `/comments/${post._id}`
      );

      setComments(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    if (!text.trim()) return;

    try {

      await API.post(
        `/comments/${post._id}`,
        {
          text,
        }
      );

      setText("");

      fetchComments();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="bg-white  rounded-lg overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">

          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
            {post.user?.username?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3
              className="font-semibold text-sm cursor-pointer"
              onClick={() =>
                navigate(`/profile/${post.user._id}`)
              }
            >
              {post.user?.username}
            </h3>
          </div>

        </div>

        <button className="text-xl">
          ⋯
        </button>
      </div>

      {/* Post Content */}
      <div className="space-y-4">


        {post.mediaType === "image" &&
          post.media && (
            <img
              src={post.media}
              alt="post"
              className="w-full "
            />
          )}

        {post.mediaType === "video" &&
          post.media && (
            <div className="relative overflow-hidden ">

              <video
                src={post.media}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="
          w-full
          max-h-[700px]
          object-cover
        "
              />

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="
          absolute
          bottom-4
          right-4
          bg-black/60
          backdrop-blur-sm
          rounded-full
          p-2
        "
              >
                {isMuted ? (
                  <SpeakerXMarkIcon className="w-5 h-5 text-white" />
                ) : (
                  <SpeakerWaveIcon className="w-5 h-5 text-white" />
                )}
              </button>

            </div>
          )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between px-4 py-3">

        <div className="flex gap-4 text-2xl">

          <button
            onClick={() => handleLike(post._id)}
          >
            ❤️
          </button>

          <button>
            💬
          </button>

          <button>
            📤
          </button>

        </div>

        <button>
          🔖
        </button>

      </div>

      <div className="px-4">
        <p className="font-semibold text-sm">
          {post.likes.length} likes
        </p>
      </div>

      <div className="px-4 pt-2">
        <p className="text-sm">
          <span className="font-semibold mr-2">
            {post.user?.username}
          </span>

          {post.content}
        </p>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h4 className="px-4 pt-2">
          💬 Comments ({comments.length})
        </h4>

        {/* Comments List */}
        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors duration-150"
            >
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 mt-0.5">
                  {comment.user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1">
                  <strong className="text-sm text-gray-800 block">
                    {comment.user?.username}
                  </strong>
                  <span className="text-sm text-gray-600">
                    {comment.text}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="text-center py-6 text-gray-400 text-sm">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>

        {/* Comment Input */}
        <div className="border-t border-gray-200 flex items-center px-4 py-3">

          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 outline-none text-sm"
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
          />

          <button
            onClick={addComment}
            className="text-blue-500 font-semibold"
          >
            Post
          </button>

        </div>
      </div>
    </div>
  );
}

export default PostCard;
