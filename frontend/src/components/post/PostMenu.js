import { useRef } from "react";
import { saveAs } from "file-saver";
import MenuItem from "./MenuItem";
import useClickOutside from "../../helpers/clickOutside";
import { deletePost, saveHandler } from "../../functions/post";
export default function PostMenu({
  userId,
  postUserId,
  imagesLength,
  setShowMenu,
  postId,
  token,
  checkSaved,
  setCheckSaved,
  images,
  postRef,
}) {
  const test = userId === postUserId;
  const menu = useRef(null);
  useClickOutside(menu, () => setShowMenu(false));
  const savePostHandler = async () => {
    saveHandler(postId, token);
    setCheckSaved((prev) => !prev);
  };
  const downloadImages = () => {
    images.map((image) => saveAs(image.url, "image.jpg"));
  };
  const deleteHandler = async () => {
    const { status } = await deletePost(postId, token);

    if (status === "success") {
      // postRef.current.style.display = "none";
      postRef.current.remove();
    }
  };

  return (
    <ul className="post_menu" ref={menu}>
      {test && <MenuItem icon="pin_icon" title="Pin Post" />}
      <div onClick={() => savePostHandler()}>
        {checkSaved ? (
          <MenuItem
            icon="save_icon"
            title="Unsave Post"
            subtitle="Remove this from your saved items."
          />
        ) : (
          <MenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items."
          />
        )}
      </div>
      <div className="line"></div>
      {test && <MenuItem icon="edit_icon" title="Edit Post" />}
      {!test && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )}
      {imagesLength && (
        <div onClick={downloadImages}>
          <MenuItem icon="download_icon" title="Download" />
        </div>
      )}
      {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {test && <MenuItem img="/icons/lock.png" title="Edit audience" />}
      {test && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {test && <MenuItem icon="delete_icon" title="Turn off translations" />}
      {test && <MenuItem icon="date_icon" title="Edit Date" />}
      {test && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {test && <MenuItem icon="archive_icon" title="Move to archive" />}
      {test && (
        <div onClick={() => deleteHandler()}>
          <MenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="items in your trash are deleted after 30 days"
          />
        </div>
      )}
      {!test && <div className="line"></div>}
      {!test && (
        <MenuItem
          img="/icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      )}
    </ul>
  );
}
