import axios from "axios";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import { profileReducer } from "../../functions/reducer";
import Cover from "./Cover";
import ProfileMenu from "./ProfileMenu";
import ProfilePicture from "./ProfilePicture";
import "./style.css";

export default function Profile() {
  const { user } = useSelector((state) => ({ ...state }));
  // Default username = loggedin user username
  const { username = user.username } = useParams();
  const navigate = useNavigate();

  const [{ profile, loading, error }, dispatch] = useReducer(profileReducer, {
    profile: {},
    loading: false,
    error: "",
  });
  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      dispatch({
        type: "PROFILE_SUCCESS",
        payload: data.user,
      });
    } catch (error) {
      navigate("/profile");
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data?.message,
      });
    }
  };
  useEffect(() => {
    getProfile();
  }, [username]);

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile.cover} />
          <ProfilePicture profile={profile} />
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}
