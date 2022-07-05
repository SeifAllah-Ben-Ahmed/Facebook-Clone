import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Picker from "emoji-picker-react";

export default function CreateComment() {
  const { user } = useSelector((store) => ({ ...store }));
  const textRef = useRef();
  const imgRef = useRef();
  const [picker, setPicker] = useState(false);
  const [comment, setComment] = useState("");
  const [cursor, setCursor] = useState(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    textRef.current.selectionEnd = cursor;
  }, [cursor, textRef]);

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = comment.substring(0, ref.selectionStart);
    const end = comment.substring(ref.selectionStart);
    const updateText = start + emoji + end;
    setComment(updateText);
    setCursor(start.length + emoji.length);
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file.type.startsWith("image")) {
      setError("Unsupported format! only images are alloawd.");
      return;
    } else if (file.size > 1024 * 1024 * 2) {
      setError(`${file.name} size is too large max 2mb allowed.`);
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        setImage(readerEvent.target.result);
      };
    }
  };
  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="user" />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={imgRef}
            accept="image/*"
            onChange={handleImage}
          />
          {error && (
            <div className="postError comment_error">
              <div className="postError_error"> {error} </div>
              <button className="blue_btn" onClick={() => setError("")}>
                Try again
              </button>
            </div>
          )}
          <input
            type="texte"
            ref={textRef}
            value={comment}
            placeholder="Write a comment..."
            onChange={(e) => setComment(e.target.value)}
          />
          <div
            className="comment_circle_icon hover2"
            onClick={() => setPicker((prev) => !prev)}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => imgRef.current.click()}
          >
            <i className="camera_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {image && (
        <div className="comment_img_preview">
          <img src={image} alt="comment" />
          <div className="small_white_circle" onClick={() => setImage("")}>
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
}
