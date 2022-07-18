import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
  follow,
  unfollow,
  unfriend,
} from "../../functions/user";
import useClickOutside from "../../helpers/clickOutside";

export default function Friendship({ friendshipp, profileId }) {
  const [friendship, setFriendship] = useState(friendshipp);
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const menuRef = useRef(null);
  const menu = useRef(null);
  useEffect(() => {
    setFriendship(friendshipp);
  }, [friendshipp]);

  useClickOutside(menuRef, () => setFriendsMenu(false));
  useClickOutside(menu, () => setRespondMenu(false));
  const { user } = useSelector((state) => ({ ...state }));
  const addFriendHandler = async () => {
    await addFriend(profileId, user.token);
    setFriendship({
      ...friendshipp,
      requestSent: true,
      following: true,
      friends: false,
    });
  };
  const cancelRequestHandler = async () => {
    await cancelRequest(profileId, user.token);
    setFriendship({ ...friendshipp, requestSent: false, following: false });
  };
  const followHandler = async () => {
    await follow(profileId, user.token);
    setFriendship({ ...friendshipp, following: true });
  };
  const unfollowHandler = async () => {
    await unfollow(profileId, user.token);
    setFriendship({ ...friendshipp, following: false });
  };
  const acceptRequestHandler = async () => {
    await acceptRequest(profileId, user.token);
    setFriendship({
      ...friendshipp,
      friends: true,
      following: true,
      requestSent: false,
      requestReceived: false,
    });
  };
  const unfriendHandler = async () => {
    await unfriend(profileId, user.token);
    setFriendship({
      ...friendshipp,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
  };
  const deleteRequestHandler = async () => {
    await deleteRequest(profileId, user.token);
    setFriendship({
      ...friendshipp,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
  };
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
              <div
                className="open_cover_menu_item hover1"
                onClick={() => unfriendHandler()}
              >
                <i className="unfriend_outlined_icon"></i>
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className="blue_btn" onClick={() => addFriendHandler()}>
            <img src="/icons/addFriend.png" alt="friends" className="invert" />
            <span>Add Friend</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button className="blue_btn" onClick={() => cancelRequestHandler()}>
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
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => acceptRequestHandler()}
                >
                  Confirm
                </div>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => deleteRequestHandler()}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        )
      )}
      <div className="flex">
        {friendship?.following ? (
          <button className="gray_btn" onClick={() => unfollowHandler()}>
            <img src="/icons/follow.png" alt="friends" />
            <span>Following</span>
          </button>
        ) : (
          <button className="blue_btn" onClick={() => followHandler()}>
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
    </div>
  );
}
