import { DoorOpenIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-100 backdrop-blur-md shadow-sm bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div
          className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-200"

        >
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-purple-500/30">
            <span className="text-xl">🌐</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent tracking-tight">
            Social<span className="bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">Sphere</span>
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 items-center">
          <button
            className="flex items-center gap-2 px-5 py-2 bg-white text-gray-600 border border-gray-200 rounded-full font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 active:translate-y-0"
            onClick={() => navigate(`/profile/${user._id}`)}
          >

            <span className="text-sm">Profile</span>
          </button>

          <button
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-red-50 to-red-100 text-red-600 border border-red-200 rounded-full font-semibold text-sm hover:from-red-100 hover:to-red-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-red-500/20 transition-all duration-200 active:translate-y-0"
            onClick={logout}
          >
           <span className="text-sm">Logout</span>

          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
