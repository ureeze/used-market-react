import { Col, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import NavicationBar from "./NavicationBar.js";

function ChatRoom() {
  const [chatRoomState, setChatRoomState] = useState({
    chatRoomId: "",
    postId: "",
    postTitle: "",
    sellerId: "",
    userId: "",
    userName: "",
  });
  const state = useLocation().state;
  console.log(state);
  console.log(chatRoomState);
  const retrieveChatRoom = async () => {
    let headers = new Headers({
      "Content-Type": "application/json",
    });
    const token = sessionStorage.getItem("token");
    if (token && token !== null) {
      headers.append("Authorization", "Bearer " + token);
    }
    try {
      const response = await fetch(
        `http://localhost:8080/chatrooms/post/${state.postId}`,
        {
          method: "POST",
          headers: headers, 
        }
      );
      const chatRoomState = await response.json();
      console.log(chatRoomState);
      if (!response.ok) {
        throw Error("채팅 오류가 발생하였습니다.");
      } else {
        setChatRoomState(chatRoomState);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    retrieveChatRoom();
  }, []);

  return (
    <>
      <NavicationBar />
      <Row>
        <Col></Col>
        <Col xs={6}>
          <Link to={`/posts/chat`} state={chatRoomState}>
            <Button style={{ width: "100%", marginTop: "15px" }}>
              채팅 시작하기
            </Button>
          </Link>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default ChatRoom;
