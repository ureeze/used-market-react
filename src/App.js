import Main from "./component/Main.js";
import Login_form from "./component/Login_form.js";
import Join_form from "./component/Join_form.js";
import List from "./component/List.js";
import Navicationbar from "./component/Navicationbar.js";
import Read_Post from "./component/Read_Post.js";
import Write_Post from "./component/Write_Post.js";
import Update_Post from "./component/Update_Post.js";
import Order_Form from "./component/Order_Form.js";
import Order_Confirm from "./component/Order_Confirm.js";
import My_Order from "./component/My_Order.js";
import Order_Details from "./component/Order_Details.js";
import My_Posts from "./component/My_Posts.js";
import Book_Search from "./component/Book_Search.js";
import ChatRoom from "./component/ChatRoom.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  let login;
  token_validation();

  let initialState = [];
  const store = createStore(reducer, composeWithDevTools());

  function reducer(state = initialState, action) {
    if (initialState === undefined) {
      return {
        message: 0,
      };
    }
    let newState = [ ...state ];
    console.log(newState);
    if (action.type === "NEW_MESSAGE") {
      return newState.concat(action.payload);
    }
    return newState;
  }

  function token_validation() {
    console.log("app_token");
    const token = sessionStorage.getItem("token");
    if (token && token !== null) {
      console.log("login");
      login = true;
    } else {
      console.log("log out");
      login = false;
      sessionStorage.clear();
    }
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navicationbar login={login} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Join_form />} />
          <Route path="/login" element={<Login_form />} />
          <Route path="/list" element={<List />} />
          <Route path="/posts/:id" element={<Read_Post />} />
          <Route path="/write-post" element={<Write_Post />} />
          <Route path="/update_post/:postId" element={<Update_Post />} />
          <Route path="/order_page/:postId" element={<Order_Form />} />
          <Route path="/order_confirm" element={<Order_Confirm />} />
          <Route path="/mypage/orders" element={<My_Order />} />
          <Route path="/mypage/orders/:id" element={<Order_Details />} />
          <Route path="/mypage/posts" element={<My_Posts />} />
          <Route path="/books/search" element={<Book_Search />} />
          <Route path="/posts/chat" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
