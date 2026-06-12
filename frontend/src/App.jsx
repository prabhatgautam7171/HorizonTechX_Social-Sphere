import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";

import "./styles/style.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/feed/:id"
          element={<Feed />}
        />

        <Route
          path="/profile/:id"
          element={<Profile />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
