function LoginInfo(state = { token: "", userId: "", email: "", name: "" }, action) {
  console.log(action); 
  if (action.type === "LOGIN_INFO") {
    return {
      ...state,
      userId: action.payload.userId,
      email: action.payload.email,
      name: action.payload.name,
      token: action.payload.token,
    };
  }
  return { ...state };
}

export default LoginInfo;
