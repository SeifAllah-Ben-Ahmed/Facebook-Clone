import { useRef, useState } from "react";

import "./style.css";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutside from "../../helpers/clickOutside";

export default function CreatePostPupop({ user, setVisible }) {
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const postRef = useRef();
  useClickOutside(postRef, () => setVisible(false));
  return (
    <div className="blur">
      <div className="postBox" ref={postRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
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

        {!show ? (
          <EmojiPickerBackground
            setText={setText}
            text={text}
            user={user}
            setBackground={setBackground}
            background={background}
          />
        ) : (
          <ImagePreview
            setText={setText}
            text={text}
            user={user}
            images={images}
            setImages={setImages}
            setShow={setShow}
          />
        )}
        <AddToYourPost setShow={setShow} />
        <button className="post_submit" onClick={() => console.log("hello")}>
          Post
        </button>
      </div>
    </div>
  );
}
