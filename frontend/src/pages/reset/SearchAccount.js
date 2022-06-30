import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import LoginInput from "../../components/inputs/loginInput";

export default function SearchAccount({
  email,
  setEmail,
  loading,
  error,
  setLoading,
  setError,
  setUserInfo,
  setVisible,
}) {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email address"),
  });
  const handleSearch = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        { email }
      );
      setLoading(false);
      setUserInfo(data);
      setVisible(1);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form">
      <h3 className="reset_form_header">Find Your Account</h3>
      <p className="reset_form_text">
        Please enter your email address or mobile number to search for tour
        account.
      </p>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={validateEmail}
        onSubmit={handleSearch}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Eamil address or mobile number"
            />
            <DotLoader color="#1876f2" loading={loading} size={30} />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
