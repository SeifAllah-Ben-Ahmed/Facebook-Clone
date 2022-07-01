import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import DotLoader from "react-spinners/DotLoader";
import LoginInput from "../../components/inputs/loginInput";

export default function CodeVerification({
  code,
  setCode,
  error,
  setError,
  setVisible,
  loading,
  setLoading,
  user,
}) {
  const validateCode = Yup.object({
    code: Yup.string().required("Code is required"),
  });
  const verifyCode = async () => {
    // validateResetCode
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
        { email: user.email, code }
      );
      setLoading(false);
      setVisible(3);
      setError("");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form">
      <h3 className="reset_form_header">Code verification</h3>
      <p className="reset_form_text">
        Please enter Code that been sent to your email.
      </p>
      <Formik
        enableReinitialize
        initialValues={{
          code,
        }}
        validationSchema={validateCode}
        onSubmit={verifyCode}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code"
            />
            <DotLoader color="#1876f2" loading={loading} size={30} />
            {error && <div className="error_text">{error}</div>}
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
