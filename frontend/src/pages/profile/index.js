import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import Post from "../../components/post";
import { profileReducer } from "../../functions/reducer";
import Cover from "./Cover";
import Friends from "./Friends";
import GridPosts from "./GridPosts";
import Photos from "./Photos";
import PplYouMayKnow from "./PplYouMayKnow";
import ProfileMenu from "./ProfileMenu";
import ProfilePicture from "./ProfilePicture";
import "./style.css";

export default function Profile({ setVisible }) {
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
        payload: { ...data.user, posts: data.posts },
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
  const visitor = !(username === user.username);

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile?.cover} visitor={visitor} />
          <ProfilePicture profile={profile} visitor={visitor} />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
            <div className="profile_grid">
              <div className="profile_left">
                <Photos username={username} token={user.token} />
                <Friends friends={profile.friends} />
                <div className="relative_fb_copyright">
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertising </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>{" "}
                  </Link>
                  <span>. </span>
                  <Link to="/"></Link>Cookies <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span> <br />
                  Meta © 2022
                </div>
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost user={user} setVisible={setVisible} profile />
                )}
                <GridPosts />
                <div className="posts">
                  {profile?.posts?.length ? (
                    profile?.posts?.map((post) => (
                      <Post post={post} user={user} key={post._id} profile />
                    ))
                  ) : (
                    <div className="no_posts">No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
