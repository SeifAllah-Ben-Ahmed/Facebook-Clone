import React, { useRef } from "react";
import EmojiPickerBackground from "./EmojiPickerBackground";

export default function ImagePreview({
  setText,
  text,
  user,
  images,
  setImages,
  setShow,
  setError,
}) {
  const imageInputRef = useRef(null);
  const handleImage = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (img.type.startsWith("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (readerEvent) => {
          setImages((prev) => [...prev, readerEvent.target.result]);
        };
      } else {
        setError("Unsupported format! only images are alloawd.");
        return;
      }
    });
  };

  return (
    <div className="overflow_a scrollbar">
      <EmojiPickerBackground setText={setText} text={text} user={user} type2 />
      <div className="add_pics_warp">
        <input
          accept="image/*"
          type="file"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImage}
        />
        {images.length ? (
          <div className="add_pics_inside1 p0">
            <div className="preveiw_actions">
              <button>
                <i className="edit_icon"></i>
                Edit
              </button>
              <button onClick={() => imageInputRef.current.click()}>
                <i className="addPhoto_icon"></i>
                Add Photos/Videos
              </button>
            </div>
            <button
              className="small_white_circle"
              onClick={() => setImages([])}
            >
              <i className="exit_icon"></i>
            </button>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4"
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {images?.map((img, i) => (
                <img src={img} alt="preview post" key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1">
            <button
              className="small_white_circle"
              onClick={() => setShow(false)}
            >
              <i className="exit_icon"></i>
            </button>
            <div
              className="add_col"
              onClick={() => imageInputRef.current.click()}
            >
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos/Video</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        <div className="add_pics_inside2">
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">Add photos from your mobile device.</div>
          <span className="addphone_btn">Add</span>
        </div>
      </div>
    </div>
  );
}
