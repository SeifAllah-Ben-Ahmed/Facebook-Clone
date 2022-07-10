import { useRef, useState } from "react";
import ProfilePic from "../../components/profilePicture";

export default function ProfilePicture({ profile, visitor }) {
  const [show, setShow] = useState(false);
  const pRef = useRef(null);

  return (
    <div className="profile_img_wrap">
      {show && <ProfilePic setShow={setShow} pRef={pRef} />}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg"
            ref={pRef}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          {!visitor && (
            <div
              className="profile_circle hover1"
              onClick={() => setShow(true)}
            >
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className="profile_w_col">
          <div className="profile_name">
            {profile.firstName} {profile.lastName}
            <div className="othername">(other name)</div>
          </div>
          <div className="profile_friend_count"></div>
          <div className="profile_friend_imgs"></div>
        </div>
      </div>
      {visitor ? (
        ""
      ) : (
        <div className="profile_w_right">
          <div className="blue_btn">
            <img src="/icons/plus.png" alt="plus" className="invert" />
            <span>Add to story</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Edit profile</span>
          </div>
        </div>
      )}
    </div>
  );
}
