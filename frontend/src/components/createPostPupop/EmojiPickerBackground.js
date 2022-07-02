import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

export default function EmojiPicker({ text, setText, user, type2 }) {
  const textRef = useRef();
  const [picker, setPicker] = useState(false);
  const [cursor, setCursor] = useState(null);
  useEffect(() => {
    textRef.current.selectionEnd = cursor;
  }, [cursor, textRef]);

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const updateText = start + emoji + end;
    setText(updateText);
    setCursor(start.length + emoji.length);
  };

  return (
    <div className={type2 ? "images_input" : ""}>
      <div className={!type2 ? "flex_center" : ""}>
        <textarea
          ref={textRef}
          className={`post_input ${type2 ? "input2" : ""}`}
          name="post"
          maxLength="100"
          placeholder={`Wtat's on your mind, ${user?.firstName}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className={!type2 ? "post_emojis_wrap" : ""}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? "movepicker2" : "rlmove"
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && <img src="/icons/colorful.png" alt="color picker" />}
        <i
          className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
          onClick={() => setPicker((perv) => !perv)}
        ></i>
      </div>
    </div>
  );
}
