import Main from "./component/Main.js";
import LoginForm from "./component/LoginForm.js";
import JoinForm from "./component/JoinForm.js";
import List from "./component/List.js"; 
import ReadPost from "./component/ReadPost.js";
import WritePost from "./component/WritePost.js";
import UpdatePost from "./component/UpdatePost.js";
import OrderForm from "./component/OrderForm.js";
import OrderConfirm from "./component/OrderConfirm.js";
import MyOrder from "./component/MyOrder.js";
import OrderDetails from "./component/OrderDetails.js";
import MyPosts from "./component/MyPosts.js";
import Search from "./component/Search.js";
import ChatRoom from "./component/ChatRoom.js";
import Chat from "./component/Chat.js";
import ChatRooms from "./component/ChatRooms.js";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/rootReducer"; 

import "bootstrap/dist/css/bootstrap.min.css";

function App() { 

  const store = createStore(rootReducer, composeWithDevTools()); 

  // function token_validation() {
  //   const token = sessionStorage.getItem("token");
  //   if (token && token !== null) {
  //     console.log("LogIn");
  //     setLogin(true);
  //   } else {
  //     console.log("LogOut");
  //     setLogin(false);
  //     sessionStorage.clear();
  //   }
  // }
 
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <BrowserRouter>
        {/* <NavicationBar login={login} /> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<JoinForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/list" element={<List />} />
          <Route path="/posts/:id" element={<ReadPost />} />
          <Route path="/write-post" element={<WritePost />} />
          <Route path="/update_post/:postId" element={<UpdatePost />} />
          <Route path="/order_page/:postId" element={<OrderForm />} />
          <Route path="/order_confirm" element={<OrderConfirm />} />
          <Route path="/mypage/orders" element={<MyOrder />} />
          <Route path="/mypage/orders/:id" element={<OrderDetails />} />
          <Route path="/mypage/posts" element={<MyPosts />} />
          <Route path="/search_result" element={<Search />} />
          <Route path="/posts/chatroom" element={<ChatRoom />} />
          <Route path="/posts/chat" element={<Chat />} />
          <Route path="/chatrooms" element={<ChatRooms />} />
        </Routes>
      </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
