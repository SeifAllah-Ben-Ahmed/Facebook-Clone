import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

export default function EmojiPicker({
  text,
  setText,
  user,
  type2,
  setBackground,
  background,
}) {
  const textRef = useRef();
  const backgroundRef = useRef();
  const [picker, setPicker] = useState(false);
  const [show, setShow] = useState(false);
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

  const postBackground = [
    "/images/postBackgrounds/1.jpg",
    "/images/postBackgrounds/2.jpg",
    "/images/postBackgrounds/3.jpg",
    "/images/postBackgrounds/4.jpg",
    "/images/postBackgrounds/5.jpg",
    "/images/postBackgrounds/6.jpg",
    "/images/postBackgrounds/7.jpg",
    "/images/postBackgrounds/8.jpg",
    "/images/postBackgrounds/9.jpg",
  ];
  const backgroundHandler = (i) => {
    backgroundRef.current.style.backgroundImage = `url(${postBackground[i]})`;
    setBackground(postBackground[i]);
    backgroundRef.current.classList.add("bgHandler");
  };
  const removeBackground = (i) => {
    backgroundRef.current.style.backgroundImage = "";
    setBackground("");
    backgroundRef.current.classList.remove("bgHandler");
  };
  useEffect(() => {
    if (!background && !type2) {
      removeBackground();
    }
  }, [background]);
  return (
    <div className={type2 ? "images_input" : ""}>
      <div className={!type2 ? "flex_center" : ""} ref={backgroundRef}>
        <textarea
          ref={textRef}
          className={`post_input ${type2 ? "input2" : ""}`}
          name="post"
          maxLength="250"
          placeholder={`Wtat's on your mind, ${user?.firstName}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            paddingTop: `${
              background
                ? textRef?.current &&
                  Math.abs(textRef?.current.value.length * 0.1 - 30)
                : "0"
            }%`,
          }}
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
        {!type2 && (
          <img
            src="/icons/colorful.png"
            alt="color picker"
            onClick={() => setShow((prev) => !prev)}
          />
        )}
        {show && (
          <div className="post_backgrounds">
            <div className="no_bg" onClick={removeBackground}></div>
            {postBackground.map((bg, i) => (
              <img
                src={bg}
                alt="post Background"
                key={i}
                onClick={() => backgroundHandler(i)}
              />
            ))}
          </div>
        )}
        <i
          className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
          onClick={() => setPicker((perv) => !perv)}
        ></i>
      </div>
    </div>
  );
}
