import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import ProfileCard from "../components/ProfileCard";
import Suggestions from "../components/SuggestionCrad";
import MessagesCard from "../components/MessagesCard";
import { LinkIcon, PlusIcon } from "@phosphor-icons/react";
import Footer from "../components/Footer";


function Feed() {
  const { _id } = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPosted, setIsPosted] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const mutualConnections = 8;
  const isCurrentUser = false;


  const handleMessage = () => {
    // Navigate to messages or open chat
    navigate(`/messages/${user._id}`);
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // FETCH PROFILE
  const fetchProfile = async () => {
    try {



      const res = await API.get(
        `/users/${_id}`
      );

      setUser(res.data.user);

      setUserPosts(res.data.posts);

      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH POSTS
  const fetchPosts = async () => {
    try {

      const res = await API.get("/posts");

      setPosts(res.data);

    } catch (error) {
      console.log(error);
    }
  };



  // CREATE POST
  const createPost = async () => {
    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("content", content);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await API.post(
        "/posts/create",
        formData
      );

      console.log(res.data);

      setContent("");
      setIsPosted(true);

      fetchPosts();

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };



  // LIKE POST
  const handleLike = async (id) => {
    try {

      await API.put(`/posts/like/${id}`);

      fetchPosts();

    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }
    fetchProfile();
    fetchPosts();

    console.log(user);

  }, []);



  return (
    <div>

      <Navbar />
      <Footer />

      <div className="max-w-9xl py-4 lg:px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <ProfileCard
              id={_id}
              user={user}
              posts={userPosts}
              isCurrentUser={isCurrentUser}
              mutualConnections={mutualConnections}
              handleMessage={handleMessage}
              handleEditProfile={handleEditProfile}
              navigate={navigate}
            />
          </div>

          {/* Feed Section */}
          <div className="lg:col-span-6">


            {/* Create Post */}
            <div className="sm:hidden border-b mb-5 p-2 rounded-4xl shadow-sm ml-4 mr-4 bg-blue-100">

              <div className="flex items-center gap-3">

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  P
                </div>

                {/* Input */}
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none"
                />

                {/* Upload */}
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-gray-600"
                >
                  <PlusIcon className="w-6 h-6" />
                </label>

                {/* Post */}
                {
                    isLoading ? (
                      <button
                        disabled
                        className="
    sm:w-auto
    px-6
    py-3
    bg-gray-400
    text-white
    rounded-full
    font-medium
  "
                      >
                        Posting...
                      </button>
                    ) : (
                      <button
                        onClick={createPost}
                        className="

    sm:w-auto
    px-6
    py-3
    bg-gradient-to-r
    from-indigo-500
    to-purple-600
    text-white
    rounded-full
    font-medium
    hover:shadow-lg
    transition
  "
                      >
                        ✨ Post
                      </button>
                    )
                  }

              </div>

              <input
                id="image-upload"
                type="file"
                hidden
                accept="image/*,.mp4,.mov,.avi,video/*"
                onChange={handleImageChange}
              />

              {!isPosted && imagePreview && (
                <div className="relative w-fit">

                  {imageFile?.type?.startsWith("video") ? (

                    <video
                      src={imagePreview}
                      controls
                      className="
          w-40
          h-40
          object-cover
          rounded-xl
          border
          border-gray-200
        "
                    />

                  ) : (

                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="
          w-24
          h-24
          object-cover
          rounded-xl
          border
          border-gray-200
        "
                    />

                  )}

                  <button
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="
        absolute
        -top-2
        -right-2
        w-7
        h-7
        bg-black
        text-white
        rounded-full
        flex
        items-center
        justify-center
        text-xs
      "
                  >
                    ✕
                  </button>

                </div>
              )}

            </div>
            <div className="hidden sm:block">
              <div className="bg-white rounded-none sm:rounded-2xl shadow-sm border-y sm:border border-gray-100 p-4 sm:p-5 mb-4 sm:mb-6">
                <div className="flex items-center gap-3 mb-4">

                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center text-white">
                    ✨
                  </div>

                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                    Whats on your mind today ?
                  </h3>

                </div>

                <textarea
                  className="
    w-full
    min-h-[90px]
    sm:min-h-[120px]
    p-3
    sm:p-4
    border
    border-gray-200
    rounded-xl
    resize-none
    focus:outline-none
    focus:ring-2
    focus:ring-indigo-500
  "
                  placeholder="🌅 Chasing good vibes
📸 Making memories
✨ Enjoying the little things"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-col gap-3">

                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*,.mp4,.mov,.avi,video/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-2xl w-fit hover:scale-110 transition-transform"
                    >
                      <PlusIcon />
                    </label>

                    {!isPosted && imagePreview && (
                      <div className="relative w-fit">

                        {imageFile?.type?.startsWith("video") ? (

                          <video
                            src={imagePreview}
                            controls
                            className="
          w-40
          h-40
          object-cover
          rounded-xl
          border
          border-gray-200
        "
                          />

                        ) : (

                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="
          w-24
          h-24
          object-cover
          rounded-xl
          border
          border-gray-200
        "
                          />

                        )}

                        <button
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                          }}
                          className="
        absolute
        -top-2
        -right-2
        w-7
        h-7
        bg-black
        text-white
        rounded-full
        flex
        items-center
        justify-center
        text-xs
      "
                        >
                          ✕
                        </button>

                      </div>
                    )}

                  </div>

                  {
                    isLoading ? (
                      <button
                        disabled
                        className="
    w-full
    sm:w-auto
    px-6
    py-3
    bg-gray-400
    text-white
    rounded-full
    font-medium
  "
                      >
                        Posting...
                      </button>
                    ) : (
                      <button
                        onClick={createPost}
                        className="
    w-full
    sm:w-auto
    px-6
    py-3
    bg-gradient-to-r
    from-indigo-500
    to-purple-600
    text-white
    rounded-full
    font-medium
    hover:shadow-lg
    transition
  "
                      >
                        ✨ Post
                      </button>
                    )
                  }


                </div>
              </div>
            </div>



            {/* Posts */}
            <div className="space-y-3">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  handleLike={handleLike}
                />
              ))}
            </div>
          </div>

          <div className="hidden xl:block xl:col-span-3">
            <div className="sticky top-20 space-y-6">
              <Suggestions />
              <MessagesCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
