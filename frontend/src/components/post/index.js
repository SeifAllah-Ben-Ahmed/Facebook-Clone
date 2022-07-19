import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Dots, Public } from "../../svg";
import ReactPopup from "./ReactPopup";
import { useEffect, useState } from "react";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
import { getReact, reactPost } from "../../functions/post";
import "./style.css";
import Comment from "./Comment";

export default function Post({ post, user, profile }) {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [check, setCheck] = useState("");
  const [reacts, setReacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(1);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPostReact();
    setComments(post?.comments);
  }, [post]);

  const getPostReact = async () => {
    const { reacts, check, total } = await getReact(post?._id, user.token);
    setTotal(total);
    setReacts(reacts);
    setCheck(check);
  };
  const reactHandler = async (type) => {
    await reactPost(post._id, type, user.token);
    if (check === type) {
      setCheck("");
      const index = reacts.findIndex((x) => x.react === check);

      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(type);
      const index = reacts.findIndex((x) => x.react === type);
      const index1 = reacts.findIndex((x) => x.react === check);

      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
      }
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
      }
    }
  };
  const showMore = () => {
    setCount((prev) => prev + 3);
  };
  return (
    <div className="post" style={{ width: `${profile && "100%"}` }}>
      <div className="post_header">
        <Link
          to={`/profile/${post?.user?.username}`}
          className="post_header_left"
        >
          <img src={post?.user?.picture} alt="user" />
          <div className="header_col">
            <div className="post_profile_name">
              {post?.user?.firstName} {post?.user?.lastName}
            </div>
            <div className="updated_p">
              {post.postType === "profilePicture" &&
                `updated ${
                  post?.user?.gender === "male" ? "his" : "her"
                } profile picture`}
              {post.postType === "cover" &&
                `updated ${
                  post?.user?.gender === "male" ? "his" : "her"
                } cover picture`}
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              . <Public color="#828387" />
            </div>
          </div>
        </Link>
        <div
          className="post_header_right hover1"
          onClick={() => setShowMenu(true)}
        >
          <Dots color="#828387" />
        </div>
      </div>
      {post?.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : post.postType === null ? (
        <>
          <div className="post_text">{post?.text}</div>
          {post?.images?.length ? (
            <div
              className={`grid_${
                post.images.length > 5 ? 5 : post.images.length
              }`}
            >
              {post?.images?.slice(0, 5).map((image, i) => (
                <img
                  key={i}
                  src={image.url}
                  alt="post"
                  className={`img-${i}`}
                />
              ))}
              {post?.images?.length > 5 && (
                <div className="more-pics-shadow">
                  +{post?.images?.length - 5}
                </div>
              )}
            </div>
          ) : null}
        </>
      ) : post.postType === "profilePicture" ? (
        <div className="post_profile_wrap">
          <div className="post_updated_bg">
            {post.user?.cover && <img src={post.user.cover} alt="cover" />}
          </div>
          <img
            src={post.images[0].url}
            className="post_updated_picture"
            alt="profile"
          />
        </div>
      ) : (
        <div className="post_cover_wrap">
          <img
            src={post.images[0].url}
            // className="post_updated_picture"
            alt="profile"
          />
        </div>
      )}

      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs">
            {reacts
              .sort((a, b) => b.count - a.count)
              ?.slice(0, 3)
              .map(
                (react) =>
                  react.count > 0 && (
                    <img
                      key={react.react}
                      src={`/reacts/${react.react}.svg`}
                      alt="reaction"
                    />
                  )
              )}
          </div>
          <div className="reacts_count_num">{total > 0 && total}</div>
        </div>
        <div className="to_right">
          <div className="comments_count">
            {comments.length ? comments.length + " comments" : ""}
          </div>
          <div className="share_count">1 share</div>
        </div>
      </div>
      <div className="post_actions">
        <div
          className="post_action hover1"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => reactHandler(check ? check : "like")}
        >
          <ReactPopup
            visible={visible}
            reactHandler={reactHandler}
            setVisible={setVisible}
          />
          {check ? (
            <img
              style={{ width: "18px" }}
              className="small_react"
              src={`/reacts/${check}.svg`}
              alt="reacts"
            />
          ) : (
            <i className="like_icon"></i>
          )}
          <span
            style={{
              color: `${
                check === "like"
                  ? "#4267b2"
                  : check === "love"
                  ? "#f63459"
                  : check === "haha"
                  ? "#f7b125"
                  : check === "sad"
                  ? "#f7b125"
                  : check === "wow"
                  ? "#f7b125"
                  : check === "angry"
                  ? "#e4605a"
                  : ""
              }`,
            }}
          >
            {check || "Like"}
          </span>
        </div>
        <div className="post_action hover1">
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      <div className="comments_wrap">
        <div className="comment_order"></div>
        <CreateComment
          postId={post._id}
          setComments={setComments}
          setCount={setCount}
        />
        {comments
          ?.sort((a, b) => new Date(b.commentAt) - new Date(a.commentAt))
          .slice(0, count)
          .map((comment, i) => (
            <Comment comment={comment} key={i} />
          ))}
        {count < comments.length && (
          <div className="view_comments" onClick={showMore}>
            View more comments
          </div>
        )}
      </div>
      {showMenu && (
        <PostMenu
          imagesLength={post?.images?.length}
          userId={user.id}
          postUserId={post.user._id}
          setShowMenu={setShowMenu}
        />
      )}
    </div>
  );
}
