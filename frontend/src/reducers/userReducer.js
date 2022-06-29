import Cookies from "js-cookie";

const initialState = Cookies.get("user")
  ? JSON.parse(Cookies.get("user"))
  : null;

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "LOGIN":
      return { ...state, ...payload };
    case "VERIFY":
      return { ...state, verified: payload };

    default:
      return state;
  }
}
