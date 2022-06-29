import LeftLink from "./LeftLink";
import { left } from "../../../data/home";
import "./style.css";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../../svg";
import { useState } from "react";
import Shortcut from "./Shortcut";

export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="left_home scrollbar">
      <Link to="/profile" className="left_link hover1">
        <img src={user?.picture} alt="user" />
        <span>
          {user?.firstName} {user?.lastName}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {!visible && (
        <div className="left_link hover1" onClick={() => setVisible(true)}>
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className="more_left">
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}

          <div className="left_link hover1" onClick={() => setVisible(false)}>
            <div className="small_circle rotate360">
              <ArrowDown1 />
            </div>
            <span>show less</span>
          </div>
        </div>
      )}
      <div className="splitter" />
      <div className="shortcut">
        <h3 className="heading">Your shortcut</h3>
        <Link to="#" className="edit_shortcut">
          Edit
        </Link>
      </div>
      <div className="shortcut_list">
        <Shortcut
          link="https://youtube.com/"
          img="/images/ytb.png"
          name="Youtube Link"
        />
        <Shortcut
          link="https://instagram.com/"
          img="/images/insta.png"
          name="Instagram Link"
        />
      </div>
      <div className={`fb_copyright ${visible ? "relative_fb_copyright" : ""}`}>
        <Link to="/">Privacy </Link>
        <span>. </span>
        <Link to="/">Terms </Link>
        <span>. </span>
        <Link to="/">Advertising </Link>
        <span>. </span>
        <Link to="/">
          Ad choices <i className="ad_choices_icon"></i>
        </Link>
        <span>. </span>
        <Link to="/">Cookies </Link>
        <span>. </span>
        <Link to="/">More </Link>
        <span>. </span>
        <br />
        Meta &copy; 2022
      </div>
    </div>
  );
}
