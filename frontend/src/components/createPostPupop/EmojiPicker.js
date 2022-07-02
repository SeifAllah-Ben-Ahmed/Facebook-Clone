import Picker from "emoji-picker-react";
import { useEffect, useState } from "react";

export default function EmojiPicker({ textRef, text, setText }) {
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
    <div className="post_emojis_wrap">
      {picker && (
        <div className="comment_emoji_picker rlmove">
          <Picker onEmojiClick={handleEmoji} />
        </div>
      )}
      <img src="/icons/colorful.png" alt="color picker" />
      <i
        className="emoji_icon_large"
        onClick={() => setPicker((perv) => !perv)}
      ></i>
    </div>
  );
}
