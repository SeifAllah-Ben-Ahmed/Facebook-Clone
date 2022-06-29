import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Activate from "./pages/home/Avtivate";
import Login from "./pages/login";
import Profile from "./pages/profile";
import LoggedinRoutes from "./routes/LoggedinRoutes";
import NotLoggedinRoutes from "./routes/NotLoggedinRoutes";

function App() {
  return (
    <Routes>
      <Route element={<NotLoggedinRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<LoggedinRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/activate/:token" element={<Activate />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
