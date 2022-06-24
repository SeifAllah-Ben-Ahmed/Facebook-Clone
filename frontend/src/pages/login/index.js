import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import "./style.css";

const loginInfo = {
  email: "",
  password: "",
};

export default function Login() {
  const [login, setLogin] = useState(loginInfo);
  const { email, password } = login;
  console.log(login);
  const handleLoginChange = (e) => {
    const { value, name } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required."),
  });
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_1">
          <img src="/icons/facebook.svg" alt="faebook logo" />
          <span>
            Facebook helps you connect and share with the peaple in your life.
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
            >
              {(formik) => (
                <Form>
                  <LoginInput
                    placeholder="Email address or Phone number"
                    type="email"
                    name="email"
                    autoComplete="username"
                    onChange={handleLoginChange}
                  />

                  <LoginInput
                    placeholder="Password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    onChange={handleLoginChange}
                    bottom
                  />
                  <button type="submit" className="blue_btn ">
                    Log In
                  </button>
                </Form>
              )}
            </Formik>
            <Link to="/forgot" className="forgot_password">
              Forgotten password ?
            </Link>
            <hr />
            <button className="blue_btn open_signup">Create Account</button>
          </div>
          <Link to="/" className="sign_extra">
            <b>Create a page</b> for a celebrity, brand or business.
          </Link>
        </div>
      </div>

      <div className="register"></div>
      <footer className="login_footer">
        <div className="login_footer_wrap">
          <Link to="/">English(UK)</Link>
          <Link to="/">Français(FR)</Link>
          <Link to="/">العربية</Link>
          <Link to="/">ⵜⴰⵎⴰⵣⵉⵖⵜ</Link>
          <Link to="/">Español (España)</Link>
          <Link to="/">italiano</Link>
          <Link to="/">Deutsch</Link>
          <Link to="/">Português (Brasil)</Link>
          <Link to="/">हिन्दी</Link>
          <Link to="/">中文(简体)</Link>
          <Link to="/">日本語</Link>
          <Link to="/" className="footer_square">
            <i className="plus_icon"></i>
          </Link>
        </div>
        <div className="footer_splitter"></div>
        <div className="login_footer_wrap">
          <Link to="/">Sign Up</Link>
          <Link to="/">Log in</Link>
          <Link to="/">Messenger</Link>
          <Link to="/">Facebook Lite</Link>
          <Link to="/">Watch</Link>
          <Link to="/">Places</Link>
          <Link to="/">Games</Link>
          <Link to="/">Marketplace</Link>
          <Link to="/">Facebook Pay</Link>
          <Link to="/">Oculus</Link>
          <Link to="/">Portal</Link>
          <Link to="/">Instagram</Link>
          <Link to="/">Bulletin</Link>
          <Link to="/">Local</Link>
          <Link to="/">Fundraisers</Link>
          <Link to="/">Services</Link>
          <Link to="/">Voting Information Centre</Link>
          <Link to="/">Groups</Link>
          <Link to="/">About</Link>
          <Link to="/">Create ad</Link>
          <Link to="/">Create Page</Link>
          <Link to="/">Developers</Link>
          <Link to="/">Careers</Link>
          <Link to="/">Privacy</Link>
          <Link to="/">Cookies</Link>
          <Link to="/">
            AdChoices
            <i className="adChoices_icon"></i>
          </Link>
          <Link to="/">Terms</Link>
          <Link to="/">Help</Link>
        </div>
        <div className="login_footer_wrap">
          <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
            Meta © 2022
          </Link>
        </div>
      </footer>
    </div>
  );
}