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
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
      <CreatePostPupop user={user} />
      <Routes>
        <Route element={<NotLoggedinRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<LoggedinRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/activate/:token" element={<Activate />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </>
  );
}

export default App;
