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
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { TalkBox } from "react-talk";

function ChatRoom() {
  const [input, setInput] = useState("");
  const [chatInfo, setChatInfo] = useState();

  const location = useLocation();
  const onChange = (event) => {
    setInput(event.target.value);
  };

  var socket = new SockJS("http://localhost:8080/ws");
  var stompClient = Stomp.over(socket);

  function chatHandShaking() {
    const headers = {
      // connect, subscribe에 쓰이는 headers
    };

    stompClient.connect({}, function (frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe("/topic/greetings", function (greeting) {
        // console.log(JSON.parse(greeting.body).content);
        console.log(JSON.parse(greeting.body));
      });
    });
  }

  function sendName() {
    stompClient.send(
      "/app/hello",
      {},
      JSON.stringify({ name: "park", message: input })
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
        alert("채팅이 시작 되었습니다.");
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    create(location);
    chatHandShaking();
  }, []);

  return (
    <div className="post">
      <Row xs={1} md={1} className="g-4">
        {/* <TalkBox
          topic="react-websocket-template"
          currentUserId="ping"
          currentUser="Pinger"
          
        /> */}

        <FormControl onChange={inputChange} />
        <Button onClick={sendName}>sendName</Button>
      </Row>
    </div>
  );
}

export default ChatRoom;
