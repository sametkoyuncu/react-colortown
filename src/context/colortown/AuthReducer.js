/* eslint-disable react/function-component-definition */
/* eslint-disable react/destructuring-assignment */
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        currentUser: action.payload,
      };
    case "LOGOUT":
      return {
        currentUser: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
