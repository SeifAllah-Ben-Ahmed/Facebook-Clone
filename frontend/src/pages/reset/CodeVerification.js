import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";

export default function CodeVerification({ code, setCode, error }) {
  const validateCode = Yup.object({
    code: Yup.string().required("Code is required"),
  });
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
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code"
            />
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
