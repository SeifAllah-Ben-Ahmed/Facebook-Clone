import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";

export default function Home() {
  const { user } = useSelector((store) => ({ ...store }));
  return (
    <div>
      <Header />
      <LeftHome user={user} />
      <RightHome />
    </div>
  );
}
