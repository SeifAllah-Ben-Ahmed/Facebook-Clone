import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import Cookies from "js-cookie";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
const loginInfos = {
  email: "",
  password: "",
};
export default function LoginForm({ setVisible }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        { email, password }
      );
      setLoading(false);
      setError("");
      const { user, token } = data;
      dispatch({ type: "LOGIN", payload: { ...user, token } });
      Cookies.set("user", JSON.stringify({ ...user, token }));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
  });
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                  autoComplete="username"
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  autoComplete="current-password"
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
                <DotLoader color="#1876f2" loading={loading} size={30} />
                {error && <div className="error_text">{error}</div>}
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgotten password?
          </Link>
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}
