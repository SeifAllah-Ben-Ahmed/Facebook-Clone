import { useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import CreatePostPupop from "./components/createPostPupop";
import Home from "./pages/home";
import Activate from "./pages/home/Avtivate";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Reset from "./pages/reset";
import LoggedinRoutes from "./routes/LoggedinRoutes";
import NotLoggedinRoutes from "./routes/NotLoggedinRoutes";

function App() {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
      {visible && <CreatePostPupop user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<NotLoggedinRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<LoggedinRoutes />}>
          <Route path="/" element={<Home setVisible={setVisible} />} />
          <Route path="/activate/:token" element={<Activate />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </>
  );
}

export default App;
