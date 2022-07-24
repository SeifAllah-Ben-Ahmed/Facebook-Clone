import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  addToSearch,
  getSearch,
  removeFromSearch,
  search,
} from "../../functions/user";
import useClickOutside from "../../helpers/clickOutside";
import { Return, Search } from "../../svg";

export default function SearchMenu({ color, setShowSearchMenu, token }) {
  const [iconVisible, seticonVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState("");
  const [result, setResult] = useState([]);
  const menu = useRef(null);
  const input = useRef(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });
  const getHistory = async () => {
    const { results } = await getSearch(token);
    setSearchHistory(results);
  };

  useEffect(() => {
    getHistory();
  }, []);
  useEffect(() => {
    input.current.focus();
  }, []);
  const searchhandler = async () => {
    if (!searchTerm) return;
    const res = await search(searchTerm, token);
    setResult(res.result);
  };
  const addToSearchHandler = async (searchUser) => {
    await addToSearch(searchUser, token);
    getHistory();
  };
  const removeHandle = async (searchUser) => {
    await removeFromSearch(searchUser, token);
    getHistory();
  };
  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo" onClick={() => setShowSearchMenu(false)}>
          <div className="circle hover1">
            <Return color={color} />
          </div>
        </div>
        <div className="search" onClick={() => input.current.focus()}>
          <div>{iconVisible && <Search color={color} />}</div>
          <input
            type="text"
            placeholder=" Search Facebook"
            ref={input}
            value={searchTerm}
            onKeyUp={searchhandler}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => seticonVisible(false)}
            onBlur={() => seticonVisible(true)}
          />
        </div>
      </div>
      {result.length === 0 && (
        <div className="search_history_header">
          <span>Recent searches</span>
          <Link to="#">Edit</Link>
        </div>
      )}
      <div className="search_history scrollbar">
        {searchHistory &&
          !result.length &&
          searchHistory
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) => (
              <div className="search_user_item hover1" key={item.user._id}>
                <Link
                  onClick={() => addToSearchHandler(item.user._id)}
                  to={`/profile/${item.user.username}`}
                  className="flex"
                >
                  <img src={item.user.picture} alt="user" />
                  <span>
                    {item.user.firstName} {item.user.lastName}
                  </span>
                </Link>
                <i
                  className="exit_icon"
                  onClick={() => removeHandle(item.user._id)}
                ></i>
              </div>
            ))}
      </div>
      <div className="search_result scrollbar">
        {result?.map((user) => (
          <Link
            onClick={() => addToSearchHandler(user._id)}
            to={`/profile/${user.username}`}
            className="search_user_item hover1"
            key={user._id}
          >
            <img src={user.picture} alt="user" />
            <span>
              {user.firstName} {user.lastName}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
