import { Col, Row, Button, FormControl } from "react-bootstrap";
import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavicationBar from "./NavicationBar.js";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import MessageBox from "./MessageBox";

function Chat() {
  const [input, setInput] = useState("");

  const chatRoomState = useLocation().state;
  const chatLog = useSelector((state) => state);

  const inputE1 = useRef(null);
  const dispatch = useDispatch();
  const baseURL = process.env.REACT_APP_BASE_URL;

  console.log(chatRoomState);
  console.log(chatLog);

  let socket = new SockJS(`${baseURL}/ws`);
  let stompClient = Stomp.over(socket);

  const inputChange = (e) => {
    setInput(e.target.value);
  };

  function connect() {
    console.log("===Subscribe===");
    console.log(stompClient);
    stompClient.connect({}, function (frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe(
        `/topic/room.${chatRoomState.chatRoomId}`,
        function (message) {
          console.log(JSON.parse(message.body));
          dispatch({ type: "NEW_MESSAGE", payload: JSON.parse(message.body) });
        }
      );
    });
  }

  function disconnect() {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  function sendMessage() {
    console.log(stompClient);
    stompClient.send(
      "/pub/chat",
      {},
      JSON.stringify({
        chatRoomId: chatRoomState.chatRoomId,
        userId: Number(sessionStorage.getItem("userId")),
        message: input,
      })
    );
    setInput("");
    inputE1.current.focus();
  }

  const getChatMessages = async () => {
    let headers = new Headers({
      "Content-Type": "application/json",
    });
    const token = sessionStorage.getItem("token");
    if (token && token !== null) {
      headers.append("Authorization", "Bearer " + token);
    }
    try {
      const response = await fetch(
        `${baseURL}/chatroom/${chatRoomState.chatRoomId}/messages`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const chatList = await response.json();
      if (!response.ok) {
        throw Error("채팅 오류가 발생하였습니다.");
      } else {
        dispatch({ type: "SET_MESSAGE", payload: chatList });
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    connect();
    getChatMessages();
    return () => disconnect();
  }, []);

  return (
    <>
      <NavicationBar />
      <Row>
        <Col></Col>
        <Col xs={6}>
          <MessageBox
            messages={chatLog.Message}
            userId={sessionStorage.getItem("userId")}
          />
          <hr></hr>
          <Row>
            <Col xs={9}>
              <FormControl
                onChange={inputChange}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                value={input}
                ref={inputE1}
              />
            </Col>
            <Col xs={3} style={{ paddingLeft: "0px" }}>
              <Button onClick={sendMessage} style={{ width: "100%" }}>
                SEND
              </Button>
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default Chat;
