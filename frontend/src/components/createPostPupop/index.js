import { useRef, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import useClickOutside from "../../helpers/clickOutside";
import { createPost } from "../../functions/post";
import { uploadImages } from "../../functions/uploadImages";
import "./style.css";

export default function CreatePostPupop({
  profile,
  user,
  setVisible,
  posts,
  dispatch,
}) {
  const postRef = useRef();
  useClickOutside(postRef, () => setVisible(false));
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [background, setBackground] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);

  const postSubmit = async (e) => {
    setLoading(true);
    if (background) {
      const res = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );

      if (res.status === "success") {
        setBackground("");
        setText("");
        setVisible(false);
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [...posts, res.post],
        });
      } else {
        setError(res);
      }
    } else if (images.length) {
      const postImages = images.map((image) => dataURItoBlob(image));
      const path = `${user.username}/post_images`;
      const formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      const res = await uploadImages(formData, user.token);
      await createPost(null, null, text, res.images, user.id, user.token);
      if (res.status === "success") {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [...posts, res.post],
        });
        setImages([]);
        setText("");
        setShow(false);
        setVisible(false);
      } else {
        setError(res);
      }
    } else if (text.length) {
      const res = await createPost(null, null, text, null, user.id, user.token);

      if (res.status === "success") {
        dispatch({
          type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
          payload: [...posts, res.post],
        });
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(res);
      }
    }
    setLoading(false);
  };
  return (
    <div className="blur">
      <div className="postBox" ref={postRef}>
        {error && <PostError error={error} setError={setError} />}
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
            setError={setError}
          />
        )}
        <AddToYourPost setShow={setShow} />
        <button className="post_submit" onClick={postSubmit} disabled={loading}>
          {loading ? (
            <PulseLoader color="#fff" size={5} loading={loading} />
          ) : (
            "Post"
          )}
        </button>
      </div>
    </div>
  );
}
