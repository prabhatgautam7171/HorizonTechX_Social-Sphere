import React from 'react'
import profilePhoto from '../assets/profile.jpeg'
import { useNavigate } from 'react-router-dom';

function ProfileCard({ user, id, posts, isCurrentUser, isConnected }) {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:block rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 w-full sticky top-20 border border-gray-200 bg-white">
      <div className="flex flex-col items-center text-center">

        {/* Profile Photo */}
        <div className="
  bg-gradient-to-tr
  from-purple-500
  via-[#fa7e1e]
  via-[#d62976]
  to-white
  p-[3px]
  rounded-full
">
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-2 border-white"
          />
        </div>


        <h4 className="font-bold text-gray-800 hover:text-blue-600 cursor-pointer">
          {user?.username}
        </h4>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {user?.bio || "No bio yet"}
        </p>

        {/* Stats */}
        <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100 w-full">
          <div className="flex-1 text-center">
            <p className="font-bold text-gray-800">
              {posts?.length || 0}
            </p>
            <p className="text-xs text-gray-500">
              Posts
            </p>
          </div>

          <div className="flex-1 text-center">
            <p className="font-bold text-gray-800">
              {user?.followers?.length || 0}
            </p>
            <p className="text-xs text-gray-500">
              Followers
            </p>
          </div>

          <div className="flex-1 text-center">
            <p className="font-bold text-gray-800">
              {user?.following?.length || 0}
            </p>
            <p className="text-xs text-gray-500">
              Following
            </p>
          </div>
        </div>

        {/* Recent Posts Grid */}
        {posts?.length > 0 ? (
          <div className="w-full mt-5 pt-4 border-t border-gray-100">

            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold text-gray-700">
                Recent Posts
              </h4>

              <span onClick={() => navigate(`/profile/${id}`)} className="text-xs text-blue-500 cursor-pointer">
                View All
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1">

              {posts?.slice(0, 9).map((post) => (
                <div
                  key={post._id}
                  className="
          aspect-square
          overflow-hidden

          bg-gray-100
          cursor-pointer
          group
          relative
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
            text-white
            text-xs
            font-semibold
          "
                  >
                    ❤️ {post.likes?.length || 0}
                  </div>
                </div>
              ))}

            </div>

          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-5">
            No posts yet
          </p>
        )
        }


      </div>
    </div>
  )
}

export default ProfileCard
