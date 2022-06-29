import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import ActivateForm from "./ActivateForm";
import "./style.css";
export default function Activate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => ({ ...store }));
  const { token } = useParams();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const avtivateAccount = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      dispatch({ type: "VERIFY", payload: true });
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
      setError(error.response.data?.message);
    }
  };
  useEffect(() => {
    avtivateAccount();
  }, []);

  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account verification succeded"
          text={success}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed"
          text={error}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome />
    </div>
  );
}
