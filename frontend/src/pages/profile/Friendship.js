import { useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";

export default function Friendship({ friendship }) {
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const menuRef = useRef(null);
  const menu = useRef(null);
  useClickOutside(menuRef, () => setFriendsMenu(false));
  useClickOutside(menu, () => setRespondMenu(false));

  return (
    <div className="friendship">
      {friendship?.friends ? (
        <div className="friends_menu_wrap" ref={menuRef}>
          <button
            className="gray_btn"
            onClick={() => setFriendsMenu((prev) => !prev)}
          >
            <img src="/icons/friends.png" alt="friends" />
            <span>Friends</span>
          </button>
          {friendsMenu && (
            <div className="open_cover_menu">
              <div className="open_cover_menu_item hover1">
                <img src="/icons/favoritesOutline.png" alt="favorites" />
                Favorites
              </div>
              <div className="open_cover_menu_item hover1">
                <img src="/icons/editFriends.png" alt="favorites" />
                Edit Friend List
              </div>

              {friendship?.following ? (
                <div className="open_cover_menu_item hover1">
                  <img src="/icons/unfollowOutlined.png" alt="favorites" />
                  Unfollow
                </div>
              ) : (
                <div className="open_cover_menu_item hover1">
                  <img src="/icons/unfollowOutlined.png" alt="favorites" />
                  Follow
                </div>
              )}
              <div className="open_cover_menu_item hover1">
                <i className="unfriend_outlined_icon"></i>
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className="blue_btn">
            <img src="/icons/addFriend.png" alt="friends" className="invert" />
            <span>Add Friend</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button className="blue_btn">
          <img
            src="/icons/cancelRequest.png"
            alt="cancel friends"
            className="invert"
          />
          <span>Cancel Request</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className="friends_menu_wrap" ref={menu}>
            <button
              className="gray_btn"
              onClick={() => setRespondMenu((prev) => !prev)}
            >
              <img src="/icons/friends.png" alt="friends" />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className="open_cover_menu">
                <div className="open_cover_menu_item hover1">Confirm</div>
                <div className="open_cover_menu_item hover1">Delete</div>
              </div>
            )}
          </div>
        )
      )}
      {friendship?.following ? (
        <button className="gray_btn">
          <img src="/icons/follow.png" alt="friends" />
          <span>Following</span>
        </button>
      ) : (
        <button className="blue_btn">
          <img src="/icons/follow.png" alt="friends" className="invert" />
          <span>Follow</span>
        </button>
      )}
      <button className={friendship?.friends ? "blue_btn" : "gray_btn"}>
        <img
          src="/icons/message.png"
          alt="friends"
          className={friendship?.friends ? "invert" : ""}
        />
        <span>Message</span>
      </button>
    </div>
  );
}
