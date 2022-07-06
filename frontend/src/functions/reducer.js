export function postsReducer(state, { type, payload }) {
  switch (type) {
    case "POSTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: payload,
        error: "",
      };
    case "POSTS_ERROR":
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
export function profileReducer(state, { type, payload }) {
  switch (type) {
    case "PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        profile: payload,
        error: "",
      };
    case "PROFILE_ERROR":
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
