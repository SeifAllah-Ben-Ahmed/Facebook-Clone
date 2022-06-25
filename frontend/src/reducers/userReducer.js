import Cookies from "js-cookie";

const initialState = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "LOGIN":
      return { ...state, ...payload };

    default:
      return state;
  }
}
