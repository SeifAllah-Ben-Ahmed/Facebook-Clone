import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";

export default function SearchAccount({ email, setEmail, error }) {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email address"),
  });
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
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Eamil address or mobile number"
            />
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
