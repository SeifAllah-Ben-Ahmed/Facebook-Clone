import { useField, ErrorMessage } from "formik";

import "./style.css";
export default function LoginInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;
  return (
    <div>
      {showError && !bottom && (
        <div className="input_error">
          <ErrorMessage name={field.name} />
        </div>
      )}
      <div className="input_wrap">
        <input
          className={showError ? "input_error_border" : ""}
          type={field.type}
          name={field.name}
          placeholder={placeholder}
          {...field}
          {...props}
        />
        {showError && <i className="error_icon"></i>}
      </div>
      {showError && bottom && (
        <div className="input_error">
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}
