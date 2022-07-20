import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import SendVerification from "../../components/home/sendVerification";
import Stories from "../../components/home/stories";
import Post from "../../components/post";
import "./style.css";

export default function Home({ setVisible, posts, getAllPosts }) {
  const { user } = useSelector((store) => ({ ...store }));
  const middle = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [posts]);

  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="home" getAllPosts={getAllPosts} />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {!user.verified && <SendVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {posts?.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
      <RightHome />
    </div>
  );
}
