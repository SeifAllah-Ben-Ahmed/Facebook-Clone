import React from "react";
import Moment from "react-moment";

export default function Comment({ comment }) {
  return (
    <div className="comment">
      <img src={comment.commentBy.picture} alt="user" className="comment_img" />
      <div className="comment_col">
        <div className="coment_wrap">
          <div className="comment_name">
            {comment.commentBy.firstName} {comment.commentBy.lastName}
          </div>
          <div className="comment_text"> {comment.comment} </div>
        </div>
        {comment?.image && (
          <img src={comment.image} alt="comment" className="comment_image" />
        )}
        <div className="comment_actions">
          <span>Like</span>
          <span>Reply</span>
          <span>
            <Moment fromNow interval={30}>
              {comment.commentAt}
            </Moment>
          </span>
        </div>
      </div>
    </div>
  );
}
