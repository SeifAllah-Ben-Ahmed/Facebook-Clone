import { Link } from "react-router-dom";

export default function SendEmail() {
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
              <span>email@email.com</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src="/images/default_pic.png" alt="user" />
          <span>email@email.com</span>
          <span>Facebook user</span>
        </div>
      </div>
      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Not You ?
        </Link>
        <button type="submit" className="blue_btn">
          Continue
        </button>
      </div>
    </div>
  );
}
