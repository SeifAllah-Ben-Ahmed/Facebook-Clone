import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../../helpers/clickOutside";
import { Return, Search } from "../../svg";

export default function SearchMenu({ color, setShowSearchMenu }) {
  const [iconVisible, seticonVisible] = useState(true);
  const menu = useRef(null);
  const input = useRef(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    input.current.focus();
  }, []);

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
            onFocus={() => seticonVisible(false)}
            onBlur={() => seticonVisible(true)}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        <Link to="#">Edit</Link>
      </div>
      <div className="search_history"></div>
      <div className="search_result scrollbar"></div>
    </div>
  );
}
