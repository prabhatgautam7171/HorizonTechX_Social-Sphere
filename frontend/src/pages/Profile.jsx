import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";

import PostCard from "../components/PostCard";

import profilePhoto from '../assets/profile.jpeg'

function Profile() {

  const { id } = useParams();

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [user, setUser] = useState(null);

  const [posts, setPosts] = useState([]);

  const [loading, setLoading] =
    useState(true);



  // FETCH PROFILE
  const fetchProfile = async () => {
    try {

      const res = await API.get(
        `/users/${id}`
      );

      setUser(res.data.user);

      setPosts(res.data.posts);

      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  };



  // FOLLOW / UNFOLLOW
  const handleFollow = async () => {
    try {

      await API.put(
        `/users/follow/${id}`
      );

      fetchProfile();

    } catch (error) {
      console.log(error);
    }
  };



  // LIKE POST
  const handleLike = async (postId) => {
    try {

      await API.put(
        `/posts/like/${postId}`
      );

      fetchProfile();

    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    fetchProfile();
  }, [id]);



  if (loading) {
    return <h2>Loading...</h2>;
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-white">

          <div className="max-w-4xl mx-auto px-4 py-8">

            <div className="flex  sm:flex-row gap-8">

              {/* Profile Image */}

              <div className="flex justify-center sm:w-1/3">

                <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full overflow-hidden border">

                  <img
                    src={user.profilePhoto || profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />

                </div>

              </div>

              {/* Profile Info */}

              <div className="flex-1">

                {/* Username + Follow */}

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">

                  <h2 className="text-2xl font-light">
                    {user.username}
                  </h2>

                  {currentUser._id !== id && (

                    <button
                      onClick={handleFollow}
                      className={`px-5 py-1.5 rounded-lg text-sm font-semibold ${user.followers.includes(currentUser._id)
                        ? "bg-gray-100 border border-gray-300"
                        : "bg-blue-500 text-white"
                        }`}
                    >
                      {user.followers.includes(currentUser._id)
                        ? "Following"
                        : "Follow"}
                    </button>

                  )}

                </div>

                {/* Stats */}

                <div className="flex gap-8 mb-6 text-sm">

                  <p>
                    <span className="font-semibold">
                      {posts.length}
                    </span>{" "}
                    posts
                  </p>

                  <p>
                    <span className="font-semibold">
                      {user.followers.length}
                    </span>{" "}
                    followers
                  </p>

                  <p>
                    <span className="font-semibold">
                      {user.following.length}
                    </span>{" "}
                    following
                  </p>

                </div>

                {/* Name */}

                <h3 className="font-semibold mb-2">
                  {user.username}
                </h3>

                {/* Bio */}

                <p className="text-sm whitespace-pre-wrap">
                  {user.bio || "No bio yet"}
                </p>

              </div>

            </div>

          </div>

        </div>



        {/* Posts Section */}

        <div className="mt-8">

          {/* Tabs */}

          <div className="border-t border-gray-200 mt-8">

            <div className="flex justify-center">

              <button
                className="
flex
items-center
gap-2
py-4
border-t
border-black
-mt-px
text-xs
font-semibold
tracking-widest
"
              >
                POSTS
              </button>

            </div>

          </div>

          {/* Posts Grid */}

          {posts.length > 0 ? (

            <div className="grid grid-cols-3 gap-1 sm:gap-2">

              {posts.map((post) => (

                <div
                  key={post._id}
                  className="
          relative
          aspect-square
          bg-gray-100
          overflow-hidden
          cursor-pointer
          group
        "
                >

                  {post.mediaType === "image" ? (

                    <img
                      src={post.media}
                      alt="post"
                      className="
    w-full
    h-full
    object-cover
  "
                    />

                  ) : post.mediaType === "video" ? (

                    <div className="relative w-full h-full">

                      <video
                        src={post.media}
                        className="
      w-full
      h-full
      object-cover
    "
                        muted
                      />

                      <div
                        className="
      absolute
      top-2
      right-2
      bg-black/60
      text-white
      text-xs
      px-2
      py-1
      rounded-full
    "
                      >
                        🎥
                      </div>

                    </div>

                  ) : (

                    <div
                      className="
    w-full
    h-full
    flex
    items-center
    justify-center
    bg-gray-100
    text-xs
    text-gray-500
    p-2
    text-center
  "
                    >
                      {post.content?.slice(0, 40)}
                    </div>

                  )}

                  {/* Hover Overlay */}

                  <div
                    className="
            absolute
            inset-0
            bg-black/40
            opacity-0
            group-hover:opacity-100
            transition
            flex
            items-center
            justify-center
            gap-6
            text-white
            font-semibold
          "
                  >

                    <span>
                      ❤️ {post.likes?.length || 0}
                    </span>

                    <span>
                      💬 {post.comments?.length || 0}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="text-center py-20">

              <div className="text-6xl mb-4">
                📷
              </div>

              <h3 className="text-xl font-semibold">
                No Posts Yet
              </h3>

              <p className="text-gray-500 mt-2">
                {currentUser._id === id
                  ? "Share your first photo."
                  : `${user.username} hasn't posted anything yet.`}
              </p>

            </div>

          )}

        </div>
      </div>
    </div>
  );
}

export default Profile;
