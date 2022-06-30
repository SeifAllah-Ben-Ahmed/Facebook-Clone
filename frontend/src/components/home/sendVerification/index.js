import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
export default function SendVerification({ user }) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const sendVerification = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="send_verification">
      <span>
        Your account is not verified, veriy your account before if gets deleted
        after one month from creating.
      </span>
      <Link to="#" onClick={sendVerification}>
        click here to re send verification link
      </Link>

      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
}
