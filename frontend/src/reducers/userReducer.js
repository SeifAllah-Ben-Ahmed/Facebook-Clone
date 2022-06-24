export default function userReducer(state = {}, { type, payload }) {
  switch (type) {
    case "LOGIN":
      return { ...state, payload };

    default:
      return state;
  }
}
