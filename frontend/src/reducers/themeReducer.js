import Cookies from "js-cookie";

const initialState = Cookies.get("darkTheme")
  ? JSON.parse(Cookies.get("darkTheme"))
  : false;

export default function themeReducer(state = initialState, { type }) {
  switch (type) {
    case "DARK":
      return true;
    case "LIGHT":
      return false;
    default:
      return state;
  }
}
