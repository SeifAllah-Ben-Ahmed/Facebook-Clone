import { Link } from "react-router-dom";
import Moment from "react-moment";
import "./style.css";
import { Dots, Public } from "../../svg";
import ReactPopup from "./ReactPopup";
import { useState } from "react";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";

export default function Post({ post, user }) {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="post">
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
              {post.type === "profilePicture" &&
                `updated ${
                  post?.user?.gender === "male" ? "his" : "her"
                } profile picture`}
              {post.type === "cover" &&
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
      ) : (
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
      )}
      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs"></div>
          <div className="reacts_count_num"></div>
        </div>
        <div className="to_right">
          <div className="comments_count">13 comments</div>
          <div className="share_count">1 share</div>
        </div>
      </div>
      <div className="post_actions">
        <ReactPopup visible={visible} setVisible={setVisible} />
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
        >
          <i className="like_icon"></i>
          <span>Like</span>
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
        <CreateComment />
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
