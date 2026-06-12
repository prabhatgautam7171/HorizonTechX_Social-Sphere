import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        bg-white
        border-t
        border-gray-200
        flex
        justify-around
        items-center
        py-3
        lg:hidden
        z-50
      "
    >
      <button >
        <HomeIcon className="w-7 h-7 text-gray-800" />
      </button>

      <button >
        <MagnifyingGlassIcon className="w-7 h-7 text-gray-800" />
      </button>

      <button >
        <PlusCircleIcon className="w-8 h-8 text-gray-800" />
      </button>

      <button>
        <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7 text-gray-800" />
      </button>

      <button >
        <UserCircleIcon className="w-7 h-7 text-gray-800" />
      </button>
    </div>
  );
};

export default Footer;
