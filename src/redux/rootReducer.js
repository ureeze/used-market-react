import { combineReducers } from "redux";
import Message from "./Message";
import LoginInfo from "./LoginInfo";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: "root",
//   // localStorage에 저장합니다.
//   storage: storage,
//   // Message, LoginInfo 2개의 reducer 중에 LoginInfo reducer만 localstorage에 저장합니다.
//   whitelist: ["LoginInfo"],
//   // blacklist -> 그것만 제외합니다
// };

const rootReducer = combineReducers({
  Message
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;
