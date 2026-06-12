import React from "react";

const chats = [
  {
    id: 1,
    name: "Sarah Johnson",
    message: "Hey, how are you?",
    avatar: "https://i.pravatar.cc/150?img=1",
    online: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    message: "Let's connect tomorrow.",
    avatar: "https://i.pravatar.cc/150?img=2",
    online: false,
  },
  {
    id: 3,
    name: "Emma Wilson",
    message: "Nice post! 👏",
    avatar: "https://i.pravatar.cc/150?img=3",
    online: true,
  },
];

const MessagesCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">
          Recent Chats
        </h3>

        <button className="text-blue-600 text-xs font-medium hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition"
          >
            <div className="relative">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              {chat.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-gray-800 truncate">
                {chat.name}
              </h4>

              <p className="text-xs text-gray-500 truncate">
                {chat.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesCard;
