import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { HashLoader } from "react-spinners";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import Intro from "../../components/intro";
import Post from "../../components/post";
import { profileReducer } from "../../functions/reducer";
import Cover from "./Cover";
import Friends from "./Friends";
import GridPosts from "./GridPosts";
import Photos from "./Photos";
import PplYouMayKnow from "./PplYouMayKnow";
import ProfileMenu from "./ProfileMenu";
import ProfilePicture from "./ProfilePicture";
import CreatePostPupop from "../../components/createPostPupop";
import "./style.css";
import "react-loading-skeleton/dist/skeleton.css";
export default function Profile({ getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state }));
  // Default username = loggedin user username
  const { username = user.username } = useParams();
  const [othername, setOthername] = useState("");
  const navigate = useNavigate();
  const [photos, setPhotos] = useState({});
  const [{ profile, loading, error }, dispatch] = useReducer(profileReducer, {
    profile: {},
    loading: false,
    error: "",
  });

  const dataBody = {
    path: `${username}/*`,
    max: 30,
    sort: "desc",
  };

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

      const images = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/listImages`,
        dataBody,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setPhotos(images.data);

      dispatch({
        type: "PROFILE_SUCCESS",
        payload: {
          ...data.user,
          posts: data.posts,
          friendship: data.friendship,
        },
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
  const profileTop = useRef(null);
  const [height, setHeight] = useState(0);

  const leftSide = useRef(null);
  const [leftHeight, setLeftHeight] = useState(0);
  const [visible, setVisible] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(false);
  const check = useMediaQuery({
    query: "(min-width:901px)",
  });
  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300);
    setLeftHeight(leftSide.current.clientHeight + 300);
    window.addEventListener("scroll", getScroll, { passive: true });

    return () => {
      window.addEventListener("scroll", getScroll, { passive: true });
    };
  }, [loading, scrollHeight]);

  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };

  return (
    <div className="profile">
      {visible && (
        <CreatePostPupop
          posts={profile?.posts}
          dispatch={dispatch}
          user={user}
          setVisible={setVisible}
          profile
        />
      )}
      <Header page="profile" getAllPosts={getAllPosts} />
      <div className="profile_top" ref={profileTop}>
        <div className="profile_container">
          {loading ? (
            <>
              <div className="profile_cover">
                <Skeleton
                  height="347px"
                  containerClassName="avatar-skeleton"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div
                className="profile_img_wrap"
                style={{
                  marginBottom: "-3rem",
                  transform: "translateY(-8px)",
                }}
              >
                <div className="profile_w_left">
                  <Skeleton
                    circle
                    height="180px"
                    width="180px"
                    containerClassName="avatar-skeleton"
                    style={{ transform: "translateY(-3.3rem)" }}
                  />
                  <div className="profile_w_col">
                    <div className="profile_name">
                      <Skeleton
                        height="35px"
                        width="200px"
                        containerClassName="avatar-skeleton"
                      />
                      <Skeleton
                        height="30px"
                        width="100px"
                        containerClassName="avatar-skeleton"
                        style={{ transform: "translateY(2.5px)" }}
                      />
                    </div>
                    <div className="profile_friend_count">
                      <Skeleton
                        height="20px"
                        width="90px"
                        containerClassName="avatar-skeleton"
                        style={{ marginTop: "5px" }}
                      />
                    </div>
                    <div className="profile_friend_imgs">
                      {Array.from(new Array(6), (val, i) => i + 1).map(
                        (id, i) => (
                          <Skeleton
                            circle
                            height="32px"
                            width="32px"
                            containerClassName="avatar-skeleton"
                            style={{ transform: `translateX(${-i * 7}px)` }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className={`friendship ${!visitor && "fix"}`}>
                  <Skeleton
                    height="36px"
                    width={120}
                    containerClassName="avatar-skeleton"
                  />
                  <div className="flex">
                    <Skeleton
                      height="36px"
                      width={120}
                      containerClassName="avatar-skeleton"
                    />
                    {visitor && (
                      <Skeleton
                        height="36px"
                        width={120}
                        containerClassName="avatar-skeleton"
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Cover
                cover={profile?.cover}
                visitor={visitor}
                photos={photos.resources}
              />
              <ProfilePicture
                profile={profile}
                visitor={visitor}
                othername={othername}
                photos={photos.resources}
              />
            </>
          )}
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
            <div
              className={`profile_grid ${
                check && scrollHeight >= height && leftHeight > 1000
                  ? "scrollFixed showLess"
                  : check && scrollHeight >= height && leftHeight < 1000
                  ? "scrollFixed showMore"
                  : ""
              }`}
            >
              <div className="profile_left" ref={leftSide}>
                {loading ? (
                  <>
                    <div className="profile_card">
                      <div className="profile_card_header">Intro</div>
                      <div className="sekelton_loader">
                        <HashLoader color="#1876f2" />
                      </div>
                    </div>
                    <div className="profile_card">
                      <div className="profile_card_header">
                        Photos
                        <div className="profile_header_link">
                          See all photos
                        </div>
                      </div>
                      <div className="sekelton_loader">
                        <HashLoader color="#1876f2" />
                      </div>
                    </div>
                    <div className="profile_card">
                      <div className="profile_card_header">
                        Friends
                        <div className="profile_header_link">
                          See all friends
                        </div>
                      </div>
                      <div className="sekelton_loader">
                        <HashLoader color="#1876f2" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Intro detailss={profile.details} visitor={visitor} />
                    <Photos
                      photos={photos}
                      username={username}
                      token={user.token}
                    />
                    <Friends friends={profile.friends} />
                  </>
                )}
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
                {loading ? (
                  <div className="sekelton_loader">
                    <HashLoader color="#1876f2" />
                  </div>
                ) : (
                  <div className="posts">
                    {profile.posts && profile.posts.length ? (
                      profile.posts.map((post) => (
                        <Post post={post} user={user} key={post._id} profile />
                      ))
                    ) : (
                      <div className="no_posts">No posts available</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
