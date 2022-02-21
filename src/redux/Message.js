// const NEW_MESSAGE = "Message/NEW_MESSAGE";

// export const newMessage = (payload) => ({
//   type: NEW_MESSAGE,
//   payload,
// });

function Message(state = [], action) { 
  let newState = [...state];
  if (action.type === "NEW_MESSAGE") {
    return newState.concat(action.payload);
  } else if (action.type === "SET_MESSAGE") {
    return action.payload;
  }
  return newState;
}

export default Message;