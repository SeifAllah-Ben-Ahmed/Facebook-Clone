import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import CreatePostPupop from "./components/createPostPupop";
import { postsReducer } from "./functions/reducer";
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

  const [{ posts, loading, error }, dispatch] = useReducer(postsReducer, {
    posts: [],
    loading: false,
    error: "",
  });

  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      dispatch({
        type: "POSTS_SUCCESS",
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error?.response?.data?.message,
      });
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      {visible && <CreatePostPupop user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<NotLoggedinRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<LoggedinRoutes />}>
          <Route
            path="/"
            element={<Home setVisible={setVisible} posts={posts} />}
          />
          <Route path="/activate/:token" element={<Activate />} />
          <Route
            path="/profile"
            element={<Profile setVisible={setVisible} />}
          />
          <Route
            path="/profile/:username"
            element={<Profile setVisible={setVisible} />}
          />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </>
  );
}

export default App;
