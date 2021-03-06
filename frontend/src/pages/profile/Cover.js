import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { createPost } from "../../functions/post";
import { uploadImages } from "../../functions/uploadImages";
import { updateCover } from "../../functions/user";
import useClickOutside from "../../helpers/clickOutside";
import getCroppedImg from "../../helpers/getCroppedImg";
import { Public } from "../../svg";
import OldCovers from "./OldCovers";

export default function Cover({ cover, visitor, photos }) {
  const menuRef = useRef(null);
  const inputRef = useRef(null);
  const coverRef = useRef(null);
  const cRef = useRef(null);
  const [coverPicture, setCoverPicture] = useState("");
  const [loading, setLoading] = useState("");
  const [show, setShow] = useState(false);

  const [width, setWidth] = useState(0);
  const [error, setError] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  useClickOutside(menuRef, () => setShowCoverMenu());
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const handleImage = (e) => {
    let file = e.target.files[0];

    if (!file.type.startsWith("image")) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 2) {
      setError(`${file.name} is too large max 2mb allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
    };
  };
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );
  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
  }, [window.innerWidth]);
  const updateCoverPicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();

      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, user.token);

      const updated_picture = await updateCover(res.images[0].url, user.token);
      if (updated_picture === "ok") {
        const new_post = await createPost(
          "cover",
          null,
          null,
          res.images,
          user.id,
          user.token
        );
        if (new_post.status === "success") {
          setLoading(false);
          setCoverPicture("");
          cRef.current.src = res.images[0].url;
        } else {
          setLoading(false);
          setError(new_post);
        }
      } else {
        setLoading(false);
        setError(updated_picture.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="profile_cover" ref={coverRef}>
      {coverPicture && (
        <div className="save_changes_cover">
          <div className="save_changes_left">
            <Public color="#fff" />
            Your cover photo is public
          </div>
          <div className="save_changes_right">
            <button
              className="blue_btn opacity_btn"
              onClick={() => setCoverPicture("")}
            >
              Cancel
            </button>
            <button className="blue_btn" onClick={updateCoverPicture}>
              {loading ? <PulseLoader color="#fff" size={5} /> : "save changes"}
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        hidden
        accept="image/*"
        onChange={handleImage}
      />
      {error && (
        <div className="postError comment_error">
          <div className="postError_error">{error}</div>
          <button className="blue_btn" onClick={() => setError("")}>
            Try again
          </button>
        </div>
      )}
      {coverPicture && (
        <div className="cover_crooper">
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && !coverPicture && (
        <img ref={cRef} className="cover" alt="user cover" src={cover} />
      )}
      {!visitor && (
        <div className="update_cover_wrapper">
          <div
            className="open_cover_update"
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>
          {showCoverMenu && (
            <div className="open_cover_menu" ref={menuRef}>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => setShow(true)}
              >
                <i className="photo_icon"></i>
                Select Photo
              </div>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => inputRef.current.click()}
              >
                <i className="upload_icon"></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
      {show && (
        <OldCovers
          photos={photos}
          user={user}
          setCoverPicture={setCoverPicture}
          setShow={setShow}
        />
      )}
    </div>
  );
}
