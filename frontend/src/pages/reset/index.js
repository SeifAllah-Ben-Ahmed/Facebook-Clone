import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import "./style.css";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import Footer from "../../components/login/Footer";
import ChangePassword from "./ChangePassword";

export default function Reset() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(0);
  console.log(userInfo);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    Cookies.remove("user");
    navigate("/login");
  };

  return (
    <div className="reset">
      <div className="reset_header">
        <Link to="/profile">
          <img src="/icons/facebook.svg" alt="logo Facebook" />
        </Link>
        {user ? (
          <div className="right_reset">
            <img src={user.picture} alt="avatar" />
            <button className="blue_btn" onClick={logout}>
              logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setLoading={setLoading}
            setError={setError}
            setUserInfo={setUserInfo}
            setVisible={setVisible}
            loading={loading}
          />
        )}
        {visible === 1 && <SendEmail user={userInfo} />}
        {visible === 2 && (
          <CodeVerification
            code={code}
            setCode={setCode}
            error={error}
            setError={setError}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            error={error}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            setError={setError}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
