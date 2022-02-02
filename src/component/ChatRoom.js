import {
  Col,
  Row,
  Card,
  Button,
  Form,
  Figure,
  Table,
  FormControl,
  Badge,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

function ChatRoom() {
  const [input, setInput] = useState("");
  const [chatInfo, setChatInfo] = useState();

  const chatLog = useSelector((state) => state.message); 
  console.log(chatLog);

  const location = useLocation();
  const onChange = (event) => {
    setInput(event.target.value);
  };

  var socket = new SockJS("http://localhost:8080/ws");
  var stompClient = Stomp.over(socket);
  const dispatch = useDispatch();

  function chatHandShaking(roomId) {
    const headers = {
      // connect, subscribe에 쓰이는 headers
    };

    stompClient.connect('guest','guest', function (frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe("/topic/room.1" , (response) => {
        const message = JSON.parse(response.body);
        console.log(message);
        dispatch({ type: "NEW_MESSAGE", payload: message });
      });
    });
  }

  function sendName() {
    stompClient.send(
      `/pub/chat`,
      {},
      JSON.stringify({ name: chatInfo.currentUserName, message: input })
    );
  }

  function disConnect() {
    if (stompClient !== null) {
      const headers = {
        // disconnect에 쓰이는 headers
      };
      stompClient.disconnect(function () {
        // disconnect 후 실행하는 곳
      }, headers);
    }
  }

  const inputChange = (e) => {
    setInput(e.target.value);
  };

  const create = async (location) => {
    let headers = new Headers({
      "Content-Type": "application/json",
    });
    const token = sessionStorage.getItem("token");
    if (token && token !== null) {
      headers.append("Authorization", "Bearer " + token);
    }

    try {
      const response = await fetch(`http://localhost:8080/chat/room`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          postId: location.state.postId,
          writerId: location.state.writerId,
        }),
      });
      const json = await response.json();

      if (!response.ok) {
        throw Error("채팅 오류가 발생하였습니다.");
      } else {
        console.info(json);
        setChatInfo(json);
        return json;
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    const roomId = create(location);
    chatHandShaking(roomId);
  }, []);

  return (
    <div className="post">
      <Row xs={1} md={1} className="g-4"> 

        <FormControl onChange={inputChange}   />
        <Button onClick={sendName}>채팅 보내기</Button>
      </Row>
    </div>
  );
}

export default ChatRoom;
