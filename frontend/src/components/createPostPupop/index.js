import { useEffect, useRef, useState } from "react";

import "./style.css";
import EmojiPicker from "./EmojiPicker";
import AddToYourPost from "./AddToYourPost";

export default function CreatePostPupop({ user }) {
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);

  const textRef = useRef();
  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user?.picture} alt="user" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="box_privacy">
              <img src="/icons/public.png" alt="world" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {!show && (
          <>
            <div className="flex_center">
              <textarea
                ref={textRef}
                className="post_input"
                name="post"
                maxLength="100"
                placeholder={`Wtat's on your mind, ${user.firstName}`}
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            <EmojiPicker setText={setText} textRef={textRef} text={text} />
          </>
        )}
        <AddToYourPost />
        <button className="post_submit">Post</button>
      </div>
    </div>
  );
}
