import { Col, Row, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NavicationBar from "./NavicationBar.js";

function ChatRooms() {
  const [chatRoomList, setChatRoomList] = useState({
    chatRoomByBuyer: [],
    chatRoomBySeller: [],
  });
  const [visiable, setVisiable] = useState(false);
  console.log(chatRoomList);

  const getChatRooms = async () => {
    let headers = new Headers({
      "Content-Type": "application/json",
    });
    const token = sessionStorage.getItem("token");
    if (token && token !== null) {
      headers.append("Authorization", "Bearer " + token);
    }
    try {
      const response = await fetch(`http://localhost:8080/chatrooms`, {
        method: "GET",
        headers: headers,
      });
      const chatRoomList = await response.json();
      if (!response.ok) {
        throw Error("채팅 오류가 발생하였습니다.");
      } else {
        setChatRoomList(chatRoomList);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getChatRooms();
  }, []);

  return (
    <>
      <NavicationBar />
      <Row>
        <Col></Col>
        <Col xs={6}>
          <Row>
            {visiable ? (
              <Col>
                <Button
                  variant="info"
                  style={{ width: "100%" }}
                  onClick={() => {
                    setVisiable(false);
                  }}
                >
                  판매중인 도서 채팅방 보기 (
                  {chatRoomList.chatRoomBySeller.length})
                </Button>
              </Col>
            ) : (
              <Col>
                <Button
                  variant="warning"
                  style={{
                    width: "100%",
                  }}
                  onClick={() => {
                    setVisiable(true);
                  }}
                >
                  구매요청 채팅방 보기 ({chatRoomList.chatRoomByBuyer.length})
                </Button>
              </Col>
            )}
          </Row>
          {visiable ? (
            <>
              <h1 style={{ margin: "30px", textAlign: "center" }}>
                구매요청 채팅방 목록
              </h1>
              {chatRoomList.chatRoomByBuyer.map((chatRoom) => (
                <Link
                  to={`/posts/chat`}
                  state={chatRoom}
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    padding: "0px",
                    color: "black",
                    textDecorationLine: "none",
                  }}
                  key={chatRoom.chatRoomId}
                >
                  <Card
                    style={{ marginTop: "20px", backgroundColor: "honeydew" }}
                  >
                    <Card.Body style={{ textAlign: "left" }}>
                      <Card.Subtitle className="mb-2 text-muted">
                        #{chatRoom.postId} {chatRoom.postTitle}
                      </Card.Subtitle>
                      <Card.Title>sender : {chatRoom.userName}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              ))}
            </>
          ) : (
            <>
              <h1 style={{ margin: "30px", textAlign: "center" }}>
                판매중인 도서 채팅방 목록
              </h1>
              {chatRoomList.chatRoomBySeller.map((chatRoom) => (
                <Link
                  to={`/posts/chat`}
                  state={chatRoom}
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    padding: "0px",
                    color: "black",
                    textDecorationLine: "none",
                  }}
                  key={chatRoom.chatRoomId}
                >
                  <Card
                    style={{ marginTop: "20px", backgroundColor: "honeydew" }}
                  >
                    <Card.Body style={{ textAlign: "left" }}>
                      <Card.Subtitle className="mb-2 text-muted">
                        #{chatRoom.postId} {chatRoom.postTitle}
                      </Card.Subtitle>
                      <Card.Title>sender : {chatRoom.userName}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              ))}
            </>
          )}
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default ChatRooms;
