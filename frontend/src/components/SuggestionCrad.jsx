import React from "react";

const dummyUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "@sarahj",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Michael Chen",
    username: "@mikechen",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Emma Wilson",
    username: "@emmaw",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "David Kumar",
    username: "@davidk",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

const Suggestions = ({users}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Suggested for you
      </h3>

      <div className="space-y-4">
        {dummyUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <h4 className="font-medium text-gray-800 text-sm">
                  {user.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {user.username}
                </p>
              </div>
            </div>

            <button
              className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Follow
            </button>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-xs text-blue-600 font-medium hover:text-blue-700">
        View All
      </button>
    </div>
  );
};

export default Suggestions;
