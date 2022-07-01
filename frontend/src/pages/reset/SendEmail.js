import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";

export default function SendEmail({
  user,
  setVisible,
  loading,
  setLoading,
  setError,
  error,
}) {
  const sendEmail = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
        { email: user.email }
      );
      setLoading(false);
      setVisible(2);
      setError("");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form dynamic_height">
      <h3 className="reset_form_header">Reset Your Password</h3>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you wan to receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="email" id="email" checked readOnly />
            <div className="lable_col">
              <span>Send code via email</span>
              <span>{user.email}</span>
            </div>
          </label>
          {error && (
            <div className="error_text" style={{ padding: "10px" }}>
              {error}
            </div>
          )}
        </div>
        <div className="reset_right">
          <img src={user.picture} alt="user" />
          <span>{user.email}</span>
          <span>Facebook user</span>
          <DotLoader color="#1876f2" loading={loading} size={30} />
        </div>
      </div>

      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Not You ?
        </Link>
        <button onClick={sendEmail} className="blue_btn">
          Continue
        </button>
      </div>
    </div>
  );
}
