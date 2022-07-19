import React from "react";
import { useSelector } from "react-redux";
import { reactPost } from "../../functions/post";
const reactsArray = [
  {
    name: "like",
    image: "../../../reacts/like.gif",
  },
  {
    name: "love",
    image: "/reacts/love.gif",
  },
  {
    name: "haha",
    image: "/reacts/haha.gif",
  },
  {
    name: "wow",
    image: "/reacts/wow.gif",
  },
  {
    name: "sad",
    image: "/reacts/sad.gif",
  },
  {
    name: "angry",
    image: "/reacts/angry.gif",
  },
];
export default function ReactPopup({ visible, setVisible, reactHandler }) {
  return (
    <>
      {visible && (
        <div
          className="reacts_popup"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
        >
          {reactsArray.map((react, i) => (
            <div
              className="react"
              key={i}
              onClick={() => reactHandler(react.name)}
            >
              <img src={react.image} alt="react" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
