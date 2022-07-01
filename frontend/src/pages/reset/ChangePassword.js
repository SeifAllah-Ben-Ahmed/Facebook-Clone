import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DotLoader from "react-spinners/DotLoader";
import LoginInput from "../../components/inputs/loginInput";

export default function ChangePassword({
  error,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
  setLoading,
  user,
  setError,
}) {
  const navigate = useNavigate();
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    confirmPassword: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const changePassword = async () => {
    // validateResetCode
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
        email: user.email,
        password,
      });
      setLoading(false);
      setError("");
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form" style={{ height: "320px" }}>
      <h3 className="reset_form_header">Change Password</h3>
      <p className="reset_form_text">Pick a strong password.</p>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          confirmPassword,
        }}
        validationSchema={validatePassword}
        onSubmit={changePassword}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
            <LoginInput
              type="password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirrm New Password"
              bottom
            />
            {error && <div className="error_text">{error}</div>}
            <DotLoader color="#1876f2" loading={loading} size={30} />
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Contunie
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
